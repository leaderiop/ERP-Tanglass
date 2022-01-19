import { AccessoryService } from '@tanglass-erp/core/product';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AccessoriesActions from '../actions/accessory.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsActions from '../actions/product.actions';

@Injectable()
export class AccessoryEffects {
  loadAccessories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccessoriesActions.loadAccessories),
      mergeMap(() =>
        this.accessorieservice.getAll().pipe(
          map((data) =>
            AccessoriesActions.loadAccessoriesSuccess({
              accessories: data.data.product_accessory,
            })
          ),
          catchError((error) =>
            of(AccessoriesActions.loadAccessoriesFailure({ error }))
          )
        )
      )
    );
  });

  insertAccessory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccessoriesActions.addAccessory),
      mergeMap((action) =>
        this.accessorieservice.insertOne(action.accessory).pipe(
          map((data) =>
            AccessoriesActions.addAccessorySuccess({
              accessory: data.data.insert_product_accessory_one,
            })
          ),
          catchError((error) =>
            of(AccessoriesActions.addAccessoryFailure({ error }))
          )
        )
      )
    );
  });

  updateAccessory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccessoriesActions.updateAccessory),
      mergeMap((action) =>
        this.accessorieservice.updateOne(action.accessory).pipe(
          map((data) =>
            AccessoriesActions.updateAccessorySuccess({
              accessory: {
                ...data.data.update_product_accessory_by_pk,
                product: {
                  ...data.data.update_product_product_by_pk,
                  companies: data.data.insert_product_product_companies.returning.map(e => ({...e.Company}))
                },
              },
            })
          ),
          catchError((error) =>
            of(AccessoriesActions.updateAccessoryFailure({ error }))
          )
        )
      )
    );
  });

  getAccessoryById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccessoriesActions.loadAccessoryById),
      mergeMap((action) =>
        this.accessorieservice.getOneById(action.id).pipe(
          map((data) =>
            AccessoriesActions.loadAccessoryByIdSuccess({
              accessory: data.data.product_accessory_by_pk,
            })
          ),
          catchError((error) =>
            of(AccessoriesActions.loadAccessoryByIdFailure({ error }))
          )
        )
      )
    );
  });

  removeAccessory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccessoriesActions.removeAccessory),
      mergeMap((action) =>
        this.accessorieservice.removeOne(action.accessoryId).pipe(
          map((data) =>
            AccessoriesActions.removeAccessorySuccess({
              accessoryId: data.data.delete_product_product_by_pk,
            })
          ),
          catchError((error) =>
            of(AccessoriesActions.removeAccessoryFailure({ error }))
          )
        )
      )
    );
  });

  removeManyAccessories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.removeManyProducts),
      mergeMap((action) =>
        this.accessorieservice.removeMany(action.codes).pipe(
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
    private accessorieservice: AccessoryService
  ) {}
}
