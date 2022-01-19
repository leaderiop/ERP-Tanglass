import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccessoryWareHouseActions from '../actions/wareHouseAccessory.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WarehouseAccessoryService } from '@tanglass-erp/core/inventory';
import { of } from 'rxjs';

@Injectable()
export class AccessoryWareHouseEffects {

  loadAccessoryWareHouses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccessoryWareHouseActions.loadWareHouseAccessories),
      mergeMap(() => this.accessoryWarehouseservice.getAll()
        .pipe(
          map((data) =>
            AccessoryWareHouseActions.loadWareHouseAccessoriesSuccess({wareHouseAccessories: data.data.stock_warehouse_substance})),
          catchError((error) =>
            of(AccessoryWareHouseActions.loadWareHouseAccessoriesFailure({error})))
          ))
    )
  );

  loadAccessoryWareHouseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccessoryWareHouseActions.loadWareHouseAccessorieById),
      mergeMap((action) => this.accessoryWarehouseservice.getOneById(action.id)
        .pipe(
          map((data) =>
            AccessoryWareHouseActions.loadWareHouseAccessorieByIdSuccess({accessoryWarehouse: data})),
          catchError((error) =>
            of(AccessoryWareHouseActions.loadWareHouseAccessorieByIdFailure({error})))
          ))
    )
  );



  constructor(private actions$: Actions,
              private accessoryWarehouseservice: WarehouseAccessoryService) {}
}
