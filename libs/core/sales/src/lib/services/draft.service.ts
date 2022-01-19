import { Injectable } from '@angular/core';
import {
  DeleteDraftsGQL,
  GetAllDraftsGQL,
  GetDraftByIdGQL,
  GetProductsByTypeGQL,
  InsertDraftGQL,
  Sales_Product_Type_Enum,
} from '@tanglass-erp/infrastructure/graphql';
@Injectable({
  providedIn: 'root',
})
export class DraftService {
  constructor(
    private insertOneGQL: InsertDraftGQL,
    private deleteDraftsGQL: DeleteDraftsGQL,
    private getProductsByTypeGQL: GetProductsByTypeGQL,
    private getAllDraftsGQL: GetAllDraftsGQL,
    private getDraftByIdGQL: GetDraftByIdGQL
  ) {}

  getAll() {
    return this.getAllDraftsGQL.watch().valueChanges;
  }

  getOneById(id: number) {
    return this.getDraftByIdGQL.watch({ id }).valueChanges;
  }

  insertOne() {
    return this.insertOneGQL.mutate();
  }

  removeMany(ids: number[]) {
    return this.deleteDraftsGQL.mutate({ ids });
  }
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
}
