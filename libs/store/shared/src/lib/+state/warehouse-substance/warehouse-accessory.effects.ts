import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WarehouseAccessoryActions from './warehouse-accessory.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ShortFeatureService } from '@tanglass-erp/core/common';
import { of } from 'rxjs';

@Injectable()
export class WarehouseAccessoryEffects {
  loadWarehouseAccessory$ =createEffect(() => {
    return this.actions$.pipe(
      ofType(WarehouseAccessoryActions.loadWarehouseAccessory),
      mergeMap((action) =>
        this.warehouseSubstanceService.getAccessoriesSubstances(action.id).pipe(
          map((data) =>
          WarehouseAccessoryActions.loadWarehouseAccessorySuccess({ warehouseAccessory: data })
          ),
          catchError((error) =>
            of(WarehouseAccessoryActions.loadWarehouseAccessoryFailure({ error }))
          )
        )
      )
    )
  });

  constructor(private actions$: Actions,
    private warehouseSubstanceService: ShortFeatureService) {}

}
