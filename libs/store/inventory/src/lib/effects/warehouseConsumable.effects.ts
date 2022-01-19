import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ConsumableWareHouseActions from '../actions/warehouseConsumable.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WarehouseConsumableService } from '@tanglass-erp/core/inventory';
import { of } from 'rxjs';

@Injectable()
export class ConsumableWareHouseEffects {

  loadTransferOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsumableWareHouseActions.loadConsumableWarehouses),
      mergeMap(() => this.consumableWarehouseservice.getAll()
        .pipe(
          map((data) =>
            ConsumableWareHouseActions.loadConsumableWarehousesSuccess({consumableWarehouses: data.data.stock_warehouse_substance})),
          catchError((error) =>
            of(ConsumableWareHouseActions.loadConsumableWarehousesFailure({error})))
          ))
    )
  );

  loadAccessoryWareHouseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsumableWareHouseActions.loadWareHouseConsumableById),
      mergeMap((action) => this.consumableWarehouseservice.getOneById(action.id)
        .pipe(
          map((data) =>
            ConsumableWareHouseActions.loadWareHouseConsumableByIdSuccess({consumableWarehouse: data})),
          catchError((error) =>
            of(ConsumableWareHouseActions.loadWareHouseConsumableByIdFailure({error})))
          ))
    )
  );




  constructor(private actions$: Actions,
              private consumableWarehouseservice: WarehouseConsumableService) {}
}
