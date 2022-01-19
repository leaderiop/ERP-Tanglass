import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeliveryService } from '@tanglass-erp/core/purchase';
import * as DeliveriesActions from './deliveries.actions';
import { Router } from '@angular/router';
import { ToastService } from '@TanglassTheme/services/toast.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PurchasesEffects {
  loadDeliveries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.loadDeliveries),
      mergeMap((action) =>
        this.deliveryService.getAll().pipe(
          map((data) =>
            DeliveriesActions.loadDeliveriesSuccess({
              deliveries: data.data.purchase_delivery,
            })
          ),
          catchError((error) =>
            of(DeliveriesActions.loadDeliveriesFailure({ error }))
          )
        )
      )
    );
  });
  removeDeliveries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.removeDelivery),
      mergeMap(({ ids }) =>
        this.deliveryService.removeMany(ids).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Verres',
              'Ajouté avec succès'
            );
            return DeliveriesActions.removeDeliverySuccess({ ids });
          }),
          catchError((error) =>
            of(DeliveriesActions.removeDeliveryFailure({ error }))
          )
        )
      )
    );
  });

  addDelivery$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.addDelivery),
      mergeMap((action) =>
        this.deliveryService.insertOne(action.delivery).pipe(
          map((data) => {
            this.toastrService.showToast(
              'info',
              'Livraison',
              'Ajouté avec succès'
            );
            this.router.navigate([
              '/purchase/reception',
              data.data.insert_purchase_delivery_one.id,
            ]);
            return DeliveriesActions.addDeliverySuccess({
              delivery: data.data.insert_purchase_delivery_one,
            });
          }),
          catchError((error) =>
            of(DeliveriesActions.addDeliveryFailure({ error }))
          )
        )
      )
    );
  });

  getOrderById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.loadDeliveryById),
      mergeMap((action) =>
        this.deliveryService.getOneById(action.id).pipe(
          map((data) => {
            return DeliveriesActions.loadDeliveryByIdSuccess({
              delivery: data.data.purchase_delivery_by_pk,
            });
          }),
          catchError((error) =>
            of(DeliveriesActions.loadDeliveryByIdFailure({ error }))
          )
        )
      )
    );
  });
  addManyDeliveryItems = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeliveriesActions.addManyDeliveryItems),
      mergeMap((action) =>
        this.deliveryService.addManyItems(action.items).pipe(
          map((data) => {
            return DeliveriesActions.addManyDeliveryItemsSuccess({
              items: data.data.insert_purchase_delivery_item.returning,
            });
          }),
          catchError((error) =>
            of(DeliveriesActions.addManyDeliveryItemsFailure({ error }))
          )
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    protected deliveryService: DeliveryService,
    private router: Router,
    private toastrService: ToastService
  ) {}
}
