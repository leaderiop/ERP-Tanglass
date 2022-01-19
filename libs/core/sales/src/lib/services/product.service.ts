import { Injectable } from '@angular/core';
import {
  DeleteProductDraftGQL,
  DeleteProductsGQL,
  GetProductsByTypeGQL,
  InsertAccessoryDraftGQL,
  InsertConsumableDraftGQL,
  InsertGlassDraftGQL,
  InsertManyConsumablesGQL,
  InsertManyGlassesGQL,
  InsertManyServicesGQL,
  InsertServiceDraftGQL,
  Sales_Product_Type_Enum,
  InsertManyProductsGQL,
} from '@tanglass-erp/infrastructure/graphql';
import {
  InsertedProduct,
  InsertedService,
  InsertedGlass,
  InsertedAccessory,
  Product_sale,
  ReturningService,
  EditGlassUI,
} from '@tanglass-erp/core/sales';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  calculatePoductDimensions,
  calculateServicesDimensions,
} from '../utils/calculators/index';
import { EditGlassAdapter } from '../utils/adapters/edit-glass.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private insertGlass: InsertGlassDraftGQL,
    private insertConsumable: InsertConsumableDraftGQL,
    private insertService: InsertServiceDraftGQL,
    private insertAccessory: InsertAccessoryDraftGQL,
    private deleteProduct: DeleteProductDraftGQL,
    private getProductsByTypeGQL: GetProductsByTypeGQL,
    private DeleteProductsGQL: DeleteProductsGQL,
    private insertManyGlassesGQL: InsertManyGlassesGQL,
    private insertManyServicesGQL: InsertManyServicesGQL,
    private insertManyConsumablesGQL: InsertManyConsumablesGQL,
    private insertManyProductsGQL: InsertManyProductsGQL
  ) {}

  //Get all the products in a draft (order or quotation)
  getDraftPorducts(draft_id: number) {
    return this.getProductsByTypeGQL.watch({ draft_id }).valueChanges;
  }
  //Get just the glasses in a draft (order or quotation)
  getDraftGlasses(draft_id: number) {
    return this.getProductsByTypeGQL.watch({
      draft_id,
      type: Sales_Product_Type_Enum.Verre,
    }).valueChanges;
  }

  //Get just the Services in a draft (order or quotation)
  getDraftServices(draft_id: number) {
    return this.getProductsByTypeGQL.watch({
      draft_id,
      type: Sales_Product_Type_Enum.Service,
    }).valueChanges;
  }

  //Get just the Accessories in a draft (order or quotation)
  getDraftAccessories(draft_id: number) {
    return this.getProductsByTypeGQL.watch({
      draft_id,
      type: Sales_Product_Type_Enum.Accessoire,
    }).valueChanges;
  }

  //Get just the Consumables in a draft (order or quotation)
  getDraftConsumables(draft_id: number) {
    return this.getProductsByTypeGQL.watch({
      draft_id,
      type: Sales_Product_Type_Enum.Consommable,
    }).valueChanges;
  }

  //add Glass to  a Draft (order or quotation )
  addGlass(createdItem: InsertedProduct) {
    return this.insertGlass.mutate(createdItem);
  }

  //add Many Glasses to  a Draft (order or quotation )
  addManyGlasses(createdItems: InsertedGlass) {
    let glasses = calculatePoductDimensions(createdItems);
    return this.insertManyGlassesGQL.mutate({ glasses }).pipe(
      map((data) =>
        data.data.insert_sales_glass_draft.returning.map((data) => {
          const { __typename, ...glass } = data.product_draft;
          return glass;
        })
      )
    );
  }
  addManyServices(createdItems: InsertedService) {
    let value = calculateServicesDimensions(createdItems);
    let res: Observable<ReturningService>;
    if (createdItems.type == Sales_Product_Type_Enum.Service)
      res = this.insertManyServicesGQL.mutate({ services: value }).pipe(
        map((data) => ({
          returning: data.data.insert_sales_service_draft?.returning.map(
            (data) => {
              const { __typename, ...item } = data?.product_draft;
              return {
                ...item,
                dependent_id: data?.dependent_id,
              };
            }
          ),
          type: Sales_Product_Type_Enum.Service,
        }))
      );
    if (createdItems.type == Sales_Product_Type_Enum.Consommable)
      res = this.insertManyConsumablesGQL.mutate({ consumables: value }).pipe(
        map((data) => ({
          returning: data.data.insert_sales_consumable_draft.returning.map(
            (data) => {
              const { __typename, ...item } = data?.product_draft;
              return {
                ...item,
                dependent_id: data?.dependent_id,
              };
            }
          ),
          type: Sales_Product_Type_Enum.Consommable,
        }))
      );
    return res;
  }

  addManyConsumables(createdItems: Product_sale[]) {
    return this.insertManyConsumablesGQL.mutate({
      consumables: createdItems.map((product) => {
        let { dependent_id, labelFactory, ...data } = product;
        return {
          dependent_id: product?.dependent_id,
          labelFactory: product?.labelFactory,
          product_draft: { data },
        };
      }),
    });
  }
  //add Consumable to  a Draft (order or quotation )
  addConsumable(createdItem: InsertedProduct) {
    return this.insertConsumable.mutate(createdItem);
  }

  //add Accessory to  a Draft (order or quotation )
  addAccessory(createdItem: InsertedAccessory) {
    const {quota,...item}=createdItem
    let accessory = {
      ...item,
      quantity: parseFloat(
        (item.quantity * quota).toFixed(2)
      ),
      total_price: parseFloat(
        (item.quantity * quota * item.price).toFixed(
          2
        )
      ),
    };
    return this.insertAccessory.mutate(accessory);
  }
  //add Service to  a Draft (order or quotation )
  addService(createdItem: InsertedProduct) {
    return this.insertService.mutate(createdItem);
  }
  removeProduct(id: string) {
    return this.deleteProduct.mutate({ id });
  }
  removeProducts(ids: string[]) {
    return this.DeleteProductsGQL.mutate({ ids });
  }
  // Update element by upsert
  updateGlass(product: EditGlassUI) {
    let items = EditGlassAdapter(product);
    return this.insertManyProductsGQL
      .mutate({
        objects: items,
      })
      .pipe(
        map((data) =>
          data.data.insert_sales_product_draft.returning.map((data) => {
            let { __typename, ...item } = data;
            return item;
          })
        )
      );
  }
}
