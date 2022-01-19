import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TransferOrderActions from '../actions/transferOrder.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TransferOrderService } from '@tanglass-erp/core/inventory';
import { of } from 'rxjs';

@Injectable()
export class TransferOrderEffects {

  loadTransferOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.loadTransferOrders),
      mergeMap(() => this.transferOrderservice.getAll()
        .pipe(
          map((data) =>
            TransferOrderActions.loadTransferOrdersSuccess({transferOrders: data.data.stock_transfer_order})),
          catchError((error) =>
            of(TransferOrderActions.loadTransferOrdersFailure({error})))
          ))
    )
  );

  loadTransferOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.loadTransferOrderById),
      mergeMap((action) => this.transferOrderservice.getOneById(action.id)
        .pipe(
          map((data) =>
            TransferOrderActions.loadTransferOrderByIdSuccess({transferOrder: data})),
          catchError((error) =>
            of(TransferOrderActions.loadTransferOrderByIdFailure({error})))
          ))
    )
  );


  addTransferOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.addTransferOrder),
      mergeMap((action) => this.transferOrderservice.insertOne(action.TransferOrder)
        .pipe(
          map((data) =>
            TransferOrderActions.addTransferOrderSuccess({TransferOrder: data.data.insert_stock_transfer_order_one})),
          catchError((error) =>
            of(TransferOrderActions.addTransferOrderFailure({error})))
          ))
    )
  );


  updateTransferOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.updateTransferOrder),
      mergeMap((action) => this.transferOrderservice.updateTransferOrder(action.transferOrder)
        .pipe(
          map((data) =>
            TransferOrderActions.updateTransferOrderSuccess({transferOrder: data.data.update_stock_transfer_order_by_pk})),
          catchError((error) =>
            of(TransferOrderActions.updateTransferOrderFailure({error})))
          ))
    )
  );

  deleteTransferOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.deleteTransferOrder),
      mergeMap((action) => this.transferOrderservice.deleteTransferOrders(action.ids)
        .pipe(
          map((data) =>
            TransferOrderActions.deleteTransferOrderSuccess({ids: action.ids})),
          catchError((error) =>
            of(TransferOrderActions.deleteTransferOrderFailure({error})))
          ))
    )
  );


  updateOrderItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.updateOrderItem),
      mergeMap((action) => this.transferOrderservice.updateStockOrderItem(action.orderItem)
        .pipe(
          map((data) =>
            TransferOrderActions.updateOrderItemSuccess({transferOrder: data})),
          catchError((error) =>
            of(TransferOrderActions.updateOrderItemFailure({error})))
          ))
    )
  );


  updateItemTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.updateItemTransfer),
      mergeMap((action) => this.transferOrderservice.updateStockItemTranfer(action.transferred)
        .pipe(
          map((data) =>
            TransferOrderActions.updateItemTransferSuccess({transferOrder: data})),
          catchError((error) =>
            of(TransferOrderActions.updateItemTransferFailure({error})))
          ))
    )
  );

  insertItemTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.insertItemTransfer),
      mergeMap((action) => this.transferOrderservice.insertStockItemTransfer(action.transferred)
        .pipe(
          map((data) =>
            TransferOrderActions.insertItemTransferSuccess({transferOrder: data})),
          catchError((error) =>
            of(TransferOrderActions.insertItemTransferFailure({error})))
          ))
    )
  );

  loadTransferOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransferOrderActions.loadOrdersDetails),
      mergeMap(() => this.transferOrderservice.getAllItemsOrders()
        .pipe(
          map((data) =>
            TransferOrderActions.loadOrdersDetailsSuccess({transferOrders: data})),
          catchError((error) =>
            of(TransferOrderActions.loadOrdersDetailsFailure({error})))
          ))
    )
  );

  constructor(private actions$: Actions,
              private transferOrderservice: TransferOrderService) {}
}
