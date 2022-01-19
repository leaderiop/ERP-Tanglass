import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WarehouseGlassActions from './warehouse-glass.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ShortFeatureService } from '@tanglass-erp/core/common';
import { of } from 'rxjs';

@Injectable()
export class WarehouseSubstanceEffects {
  loadWarehouseGlasses$ =createEffect(() => {
    return this.actions$.pipe(
      ofType(WarehouseGlassActions.loadWarehouseGlasses),
      mergeMap((action) =>
        this.warehouseSubstanceService.getGlassesSubstances(action.id).pipe(
          map((data) =>
          WarehouseGlassActions.loadWarehouseGlassesSuccess({ warehouseGlass: data })
          ),
          catchError((error) =>
            of(WarehouseGlassActions.loadWarehouseGlassesFailure({ error }))
          )
        )
      )
    )
  });



  constructor(private actions$: Actions,
    private warehouseSubstanceService: ShortFeatureService) {}
}
