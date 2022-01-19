import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';

import * as transferOrderReducers from '../reducers/transferOrder.reducer';
import * as transferOrderSelectors from '../selectors/trasnferOrder.selectors';
import * as transferOrderActions from '../actions/transferOrder.actions';
import { RequireExactlyOne } from '@tanglass-erp/core/common';
import { InsertedTransferOrder, OrderItem, Transfered } from '@tanglass-erp/core/inventory';

@Injectable({
  providedIn: 'root'
})
export class TransferOrderFacade {
  loaded$ = this.store.pipe(select(transferOrderSelectors.getTransferOrdersLoaded));
  transferOrders$ = this.store.pipe(select(transferOrderSelectors.getAllTransferOrders));
  selectedTransferOrder = this.store.pipe(select(transferOrderSelectors.getSelectedTransferOrder));

  constructor(
    private store: Store<transferOrderReducers.TransferOrderPartialState>
  ) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadAll(details=false) {
    if (details)
      this.dispatch(transferOrderActions.loadOrdersDetails());
    else
      this.dispatch(transferOrderActions.loadTransferOrders());
  }


  insertOne(TransferOrder: InsertedTransferOrder) {
    this.dispatch(transferOrderActions.addTransferOrder({TransferOrder}))
  }

  getOne(id: number) {
    this.dispatch(transferOrderActions.loadTransferOrderById({id}));
  }

  updateOne(transferOrder: RequireExactlyOne<InsertedTransferOrder, 'id'>) {
    this.dispatch(transferOrderActions.updateTransferOrder({transferOrder}));
  }

  deleteMany(ids: number[]) {
    this.dispatch(transferOrderActions.deleteTransferOrder({ids}));
  }

  updateOrderItem(orderItem: RequireExactlyOne<OrderItem, 'id'>) {
    this.dispatch(transferOrderActions.updateOrderItem({orderItem}))
  }

  updateItemTransfer(transferred: RequireExactlyOne<Transfered, 'id'>) {
    this.dispatch(transferOrderActions.updateItemTransfer({transferred}))
  }

  insertItemTransfer(transferred: Transfered) {
    this.dispatch(transferOrderActions.insertItemTransfer({transferred}));
  }

}
