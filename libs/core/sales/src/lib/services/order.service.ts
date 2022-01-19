import { Injectable } from '@angular/core';
import {
  DeleteOrdersGQL,
  GetAllOrdersGQL,
  GetOrderByIdGQL,
  InsertOrderGQL,
  InsertOrderMutationVariables,
  UpdateOrderGQL,
} from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import { UpdateOrder, invoiceFilter } from '@tanglass-erp/core/sales';
import { productAdapter } from '../utils/adapters';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private getAllOrdersGQL: GetAllOrdersGQL,
    private deleteOrdersGQL: DeleteOrdersGQL,
    private insertOrderGQL: InsertOrderGQL,
    private getOrderByIdGQL: GetOrderByIdGQL,
    private updateOrderGQL: UpdateOrderGQL
  ) {}

  getAll(params: invoiceFilter = {}) {
    const paramsToPass = { date: {} };
    if (params.dateStart) paramsToPass['date']['_gte'] = params.dateStart;
    if (params.dateEnd) paramsToPass['date']['_lte'] = params.dateEnd;
    return this.getAllOrdersGQL.watch(paramsToPass).valueChanges;
  }

  removeMany(ids: number[]) {
    return this.deleteOrdersGQL.mutate({ ids });
  }

  getOneById(id: number) {
    return this.getOrderByIdGQL.fetch({ id }).pipe(
      map((data) => ({
        ...data.data.sales_order_by_pk,
        draft_status: data.data.sales_order_by_pk.draft.status,
        products: data.data.sales_order_by_pk.draft.product_drafts.map(
          (product) => {
            return productAdapter(product);
          }
        ),
      }))
    );
  }

  insertOne(order: InsertOrderMutationVariables) {
    return this.insertOrderGQL.mutate(order);
  }

  updateOrder(order: UpdateOrder) {
    return this.updateOrderGQL.mutate(order);
  }
}
