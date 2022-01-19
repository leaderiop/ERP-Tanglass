import { Injectable } from '@angular/core';
import {
  DeleteTransferOrdersGQL,
  GetAllOrdersDetailsGQL,
  GetAllTransfersOrdersGQL,
  GetTransferOrderByIdGQL,
  InsertTranfserGQL,
  InsertTranfserMutationVariables,
  InsertTransferItemGQL,
  InsertTransferOrderGQL,
  UpdateStockItemTranferGQL,
  UpdateStockOrderItemGQL,
  UpdateTransferOrderGQL
} from '@tanglass-erp/infrastructure/graphql';
import { map } from 'rxjs/operators';
import * as fromTransfer from '../models/transrefOrder.model';
import { InsertedTransferOrder } from '../models/transrefOrder.model';
import { AdaptOrderedItems, AdaptTransferOrderDetails } from '../utils/detailOrders.Adapter';
import { Observable } from 'rxjs';
import { RequireExactlyOne } from '@tanglass-erp/core/common';
import { OrderItem, Transfered } from '../models/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferOrderService {
  constructor(
    private getAllGQL: GetAllTransfersOrdersGQL,
    private getTransferOrderByIdGQL: GetTransferOrderByIdGQL,
    private insertTransferOrderGQL: InsertTransferOrderGQL,
    private getAllOrdersDetailsGQL: GetAllOrdersDetailsGQL,
    private insertItemTranfserGQL: InsertTranfserGQL,
    private updateTransferOrderGQL: UpdateTransferOrderGQL,
    private updateStockOrderItemGQL: UpdateStockOrderItemGQL,
    private updateStockItemTranferGQL: UpdateStockItemTranferGQL,
    private deleteTransferOrdersGQL: DeleteTransferOrdersGQL,
    private insertTransferItemGQL: InsertTransferItemGQL
  ) {}

  getAll() {
    return this.getAllGQL.watch().valueChanges;
  }

  getAllItemsOrders(): Observable<fromTransfer.OrderDetails[]> {
    return this.getAllOrdersDetailsGQL
      .watch()
      .valueChanges.pipe(
        map((data) =>
          data.data.stock_order_item.map((obj) => AdaptOrderedItems(obj))
        )
      );
  }

  addTransfered(value: InsertTranfserMutationVariables) {
    return this.insertItemTranfserGQL.mutate(value);
  }
  getOneById(id: number) {
    return this.getTransferOrderByIdGQL
      .fetch({ id })
      .pipe(map((data) => AdaptTransferOrderDetails(data.data)));
  }

  insertOne(createdOne: fromTransfer.InsertedTransferOrder) {
    return this.insertTransferOrderGQL.mutate(createdOne);
  }

  updateTransferOrder(
    transferOrder: RequireExactlyOne<InsertedTransferOrder, 'id'>
  ) {
    return this.updateTransferOrderGQL.mutate(transferOrder);
  }

  deleteTransferOrders(ids: number[]) {
    return this.deleteTransferOrdersGQL.mutate({ ids });
  }

  updateStockOrderItem(orderItem: RequireExactlyOne<OrderItem, 'id'>) {
    return this.updateStockOrderItemGQL
      .mutate(orderItem)
      .pipe(
        map((data) =>
          AdaptTransferOrderDetails({
            stock_transfer_order_by_pk:
              data.data.update_stock_order_item_by_pk.transfer_order,
          })
        )
      );
  }

  updateStockItemTranfer(transfered: RequireExactlyOne<Transfered, 'id'>) {
    return this.updateStockItemTranferGQL
      .mutate(transfered)
      .pipe(
        map((data) =>
          AdaptTransferOrderDetails({
            stock_transfer_order_by_pk:
              data.data.update_stock_item_tranfer_by_pk.tranfer_order_item
                .transfer_order,
          })
        )
      );
  }


  insertStockItemTransfer(transfered: Transfered) {
    return this.insertTransferItemGQL
      .mutate(transfered)
      .pipe(
        map((data) =>
          AdaptTransferOrderDetails({
            stock_transfer_order_by_pk: data.data.insert_stock_item_tranfer_one.tranfer_order_item.transfer_order
          })
        )
      );
  }
}
