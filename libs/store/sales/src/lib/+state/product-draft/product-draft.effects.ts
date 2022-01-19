import { Injectable, ɵLocaleDataIndex } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product-draft.actions';
import { ProductService, ReparationService } from '@tanglass-erp/core/sales';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastService } from '@TanglassTheme/services/toast.service';
@Injectable()
export class ProductDraftEffects {
  insertManyGlassesDraft$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addManyGlasses),
      mergeMap((action) =>
        this.ProductService.addManyGlasses(action.glasses).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Verres',
              'Verres enregistrés avec succès'
            );
            return ProductActions.addManyGlassesSuccess({
              glasses: data,
            });
          }),
          catchError((error) =>
            of(ProductActions.addManyGlassesFailure({ error }))
          )
        )
      )
    );
  });
  insertAccessoryDraft$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addAccessory),
      mergeMap((action) =>
        this.ProductService.addAccessory(action.accessory).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Verres',
              'Accessoire enregistré avec succès'
            );
            return ProductActions.addAccessorySuccess({
              accessory:
                data.data.insert_sales_accessory_draft_one.product_draft,
            });
          }),
          catchError((error) =>
            of(ProductActions.addAccessoryFailure({ error }))
          )
        )
      )
    );
  });
  insertManyServicesDraft$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addManyServices),
      mergeMap((action) =>
        this.ProductService.addManyServices(action.services).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Services',
              'Services enregistrés avec succès'
            );
            return ProductActions.addManyServicesSuccess({
              services: data.returning,
            });
          }),
          catchError((error) =>
            of(ProductActions.addManyServicesFailure({ error }))
          )
        )
      )
    );
  });
  removeProductDraft$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.removeProducts),
      mergeMap((action) =>
        this.ProductService.removeProducts(action.ids).pipe(
          map((data) =>
            ProductActions.removeProductsSuccess({
              ids: action.ids,
            })
          ),
          catchError((error) =>
            of(ProductActions.removeProductsFailure({ error }))
          )
        )
      )
    );
  });
  updateGlass$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.editGlass),
      mergeMap((action) =>
        this.ProductService.updateGlass(action.glass).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Verres',
              'Verre Mise à jour avec succès'
            );
            return ProductActions.editGlassSuccess({
              products: data,
            });
          }),
          catchError((error) => of(ProductActions.editGlassFailure({ error })))
        )
      )
    );
  });
  insertBis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addReparationProducts),
      mergeMap((action) =>
        this.ReparationService.glassReparation(action.item).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'commande',
              'Le Bis enregistré avec succès'
            );
            return ProductActions.addReparationProductsSuccess({
              item: data,
            });
          }),
          catchError((error) =>
            of(ProductActions.addReparationProductsFailure({ error }))
          )
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private ProductService: ProductService,
    private ReparationService: ReparationService,
    private toastrService: ToastService
  ) {}
}
