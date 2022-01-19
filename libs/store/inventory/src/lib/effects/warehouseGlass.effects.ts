import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GlassWareHouseActions from '../actions/warehouseGlass.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WarehouseGlassService } from '@tanglass-erp/core/inventory';
import { of } from 'rxjs';

@Injectable()
export class GlassWareHouseEffects {

  loadTransferOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlassWareHouseActions.loadGlassWarehouses),
      mergeMap(() => this.glassWarehouseservice.getAll()
        .pipe(
          map((data) =>
            GlassWareHouseActions.loadGlassWarehousesSuccess({glassWarehouses: data.data.stock_warehouse_substance})),
          catchError((error) =>
            of(GlassWareHouseActions.loadGlassWarehousesFailure({error})))
          ))
    )
  );

  loadAccessoryWareHouseById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GlassWareHouseActions.loadWareHouseGlassById),
      mergeMap((action) => this.glassWarehouseservice.getOneById(action.id)
        .pipe(
          map((data) =>
            GlassWareHouseActions.loadWareHouseGlassByIdSuccess({glassWarehouse: data})),
          catchError((error) =>
            of(GlassWareHouseActions.loadWareHouseGlassByIdFailure({error})))
          ))
    )
  );



  constructor(private actions$: Actions,
              private glassWarehouseservice: WarehouseGlassService) {}
}
