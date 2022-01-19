import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { PaymentService } from '@tanglass-erp/core/sales';
import * as PaymentsActions from './payments.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PaymentsEffects {
  loadPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentsActions.loadPayments),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return PaymentsActions.loadPaymentsSuccess({ payments: [] });
        },

        onError: (action, error) => PaymentsActions.loadPaymentsFailure({ error }),
      })
    )
  );

  addPayment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PaymentsActions.addPayment),
      mergeMap((action) =>
        this.paymentService.insertPayment(action.payment).pipe(
          map((data) =>
            PaymentsActions.addPaymentSuccess({
              payment: data.data.insert_sales_payment_one,
            })
          ),
          catchError((error) =>
            of(PaymentsActions.addPaymentFailure({ error }))
          )
        )
      )
    );
  });

  // getOrderPayments$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(PaymentsActions.loadOrderPayments),
  //     mergeMap((action) =>
  //       this.paymentService.getOrderPayments(action.order_id).pipe(
  //         map((data) =>
  //           PaymentsActions.loadOrderPaymentsSuccess({
  //             payments: data.data.sales_payment,
  //           })
  //         ),
  //         catchError((error) =>
  //           of(PaymentsActions.loadOrderPaymentsFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // });

  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}
}
