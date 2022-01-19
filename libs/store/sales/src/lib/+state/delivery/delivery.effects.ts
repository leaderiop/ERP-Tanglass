import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DeliveryActions from './delivery.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeliveryForm, DeliveryService, InsertedDeliveryForm } from '@tanglass-erp/core/sales';
import { Router } from '@angular/router';
import { ToastService } from '@TanglassTheme/services/toast.service';

@Injectable()
export class DeliveryEffects {
  loadDelivery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.loadDelivery),
      mergeMap((action) =>
        this.deliveryService
          .getBy({
            dateStart: action.dateStart,
            dateEnd: action.dateEnd,
            status: action.status,
          })
          .pipe(
            map((data) =>
              DeliveryActions.loadDeliverySuccess({
                delivery: data.data.sales_delivery,
              })
            ),
            catchError((error) =>
              of(DeliveryActions.loadDeliveryFailure({ error }))
            )
          )
      )
    )
  );

  loadDeliveryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.loadDeliveryById),
      mergeMap((action) =>
        this.deliveryService.getOneById(<string>action.id).pipe(
          map((data) => {
            const { __typename, ...delivery } = data.data.sales_delivery_by_pk;
            return DeliveryActions.loadDeliveryByIdSuccess({
              delivery: <InsertedDeliveryForm>delivery,
            });
          }),
          catchError((error) =>
            of(DeliveryActions.loadDeliveryByIdFailure({ error }))
          )
        )
      )
    )
  );

  calcDeliveryAmount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.calcDeliveryAmount),
      map((action) =>
        DeliveryActions.calcDeliveryAmountSuccess({
          amount: this.deliveryService.calculateAmounts(action.delivery_lines),
        })
      )
    )
  );

  addDelivery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.addDelivery),
      mergeMap((action) =>
        this.deliveryService
          .insertOne({
            ...action.delivery,
            ...this.deliveryService.calculateAmounts(
              action.delivery.delivery_lines
            ),
          })
          .pipe(
            map((data) => {
              this.router.navigate(['/sales/delivery']);
              this.toastService.showToast(
                'success',
                'Bons de livraison',
                'Ajouté avec succès',
              );
              return DeliveryActions.addDeliverySuccess({
                delivery: <DeliveryForm>data.data.insert_sales_delivery_one,
              });
            }),
            catchError((error) =>
              of(DeliveryActions.addDeliveryFailure({ error }))
            )
          )
      )
    )
  );

  updateDelivery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.updateDelivery),
      mergeMap((action) =>
        this.deliveryService
          .updateDelivery({
            ...action.delivery,
            ...this.deliveryService.calculateAmounts(
              action.delivery.delivery_lines
            ),
          })
          .pipe(
            map((data: Array<any>) => {
              this.router.navigate(['sales/invoice']);
              this.toastService.showToast(
                'success',
                'Bons de livraison',
                'Mise à jour avec succès',
              );
              return DeliveryActions.updateDeliverySuccess({
                delivery: {
                  ...data[0].data.update_sales_delivery_by_pk,
                  delivery_lines: data
                    .slice(1, data.length)
                    .map((e) => e.data.update_sales_delivery_line_by_pk),
                },
              });
            }),
            tap((e) => this.router.navigate(['/sales/delivery'])),
            catchError((error) =>
              of(DeliveryActions.updateDeliveryFailure({ error }))
            )
          )
      )
    )
  );

  removeDelivery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.removeDelivery),
      mergeMap((action) =>
        this.deliveryService.deleteMany(action.ids).pipe(
          map((data) => {
            this.toastService.showToast(
              'info',
              'Bons de livraison',
              'Supprimé avec succès',
            );
            return DeliveryActions.removeDeliverySuccess({ ids: action.ids });
          }),
          catchError((error) =>
            of(DeliveryActions.removeDeliveryFailure({ error }))
          )
        )
      )
    )
  );
  loadOrderDeliveries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.loadOrderDeliveries),
      mergeMap((action) =>
        this.deliveryService
          .getOrderDeliveries(action.draft_id)

          .pipe(
            map((data) =>
              DeliveryActions.loadOrderDeliveriesSuccess({
                deliveries: data.data.sales_delivery_line,
              })
            ),
            catchError((error) =>
              of(DeliveryActions.loadOrderDeliveriesFailure({ error }))
            )
          )
      )
    )
  );
  constructor(
    private router: Router,
    private actions$: Actions,
    private deliveryService: DeliveryService,
    private toastService: ToastService,
  ) {}
}
