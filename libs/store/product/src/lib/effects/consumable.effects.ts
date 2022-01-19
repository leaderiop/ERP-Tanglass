import { ConsumableService } from '@tanglass-erp/core/product';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ConsumableActions from '../actions/consumable.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsActions from '../actions/product.actions';

@Injectable()
export class ConsumableEffects {
  loadConsumables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConsumableActions.loadConsumables),
      mergeMap(() =>
        this.consumableService.getAll().pipe(
          map((data) =>
            ConsumableActions.loadConsumablesSuccess({
              consumables: data.data.product_consumable,
            })
          ),
          catchError((error) =>
            of(ConsumableActions.loadConsumablesFailure({ error }))
          )
        )
      )
    );
  });

  insertConsumable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConsumableActions.addConsumable),
      mergeMap((action) =>
        this.consumableService.insertOne(action.consumable).pipe(
          map((data) =>
            ConsumableActions.addConsumableSuccess({
              consumable: data.data.insert_product_consumable_one,
            })
          ),
          catchError((error) =>
            of(ConsumableActions.addConsumableFailure({ error }))
          )
        )
      )
    );
  });

  updateConsumable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsumableActions.updateConsumable),
      mergeMap((action) =>
        this.consumableService.updateOne(action.consumable).pipe(
          map((data) =>
            ConsumableActions.updateConsumableSuccess({
              consumable: {
                ...data.data.update_product_consumable_by_pk,
                product: {
                  ...data.data.update_product_product_by_pk,
                  companies: data.data.insert_product_product_companies.returning.map(e => ({...e.Company}))
                }
              },
            })
          ),
          catchError((error) =>
            of(ConsumableActions.updateConsumableFailure({ error }))
          )
        )
      )
    )
  );

  getConsumableById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConsumableActions.loadConsumableById),
      mergeMap((action) =>
        this.consumableService.getOneById(action.id).pipe(
          map((data) =>
            ConsumableActions.loadConsumableByIdSuccess({
              consumable: data.data.product_consumable_by_pk,
            })
          ),
          catchError((error) =>
            of(ConsumableActions.loadConsumableByIdFailure({ error }))
          )
        )
      )
    );
  });

  removeConsumable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConsumableActions.removeConsumable),
      mergeMap((action) =>
        this.consumableService.removeOne(action.consumableId).pipe(
          map((data) =>
            ConsumableActions.removeConsumableSuccess({
              consumableId: data.data.delete_product_product_by_pk,
            })
          ),
          catchError((error) =>
            of(ConsumableActions.removeConsumableFailure({ error }))
          )
        )
      )
    );
  });
  removeManyConsumables$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.removeManyProducts),
      mergeMap((action) =>
        this.consumableService.removeMany(action.codes).pipe(
          map((data) =>
            ProductsActions.removeManyProductsSuccess({ codes: action.codes })
          ),
          catchError((error) =>
            of(ProductsActions.removeManyProductsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private consumableService: ConsumableService
  ) {}
}
