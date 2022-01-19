import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ClientOrdersActions from './orders-client.actions';
import { ShortFeatureService } from '@tanglass-erp/core/common';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OrdersClientEffects {
  loadClientOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClientOrdersActions.loadClientOrders),
      mergeMap((val) =>
        this.service.getClientOrders(val.client).pipe(
          map((data) =>
            ClientOrdersActions.loadClientOrdersSuccess({ orders: data.data.sales_order })
          ),
          catchError((error) =>
            of(ClientOrdersActions.loadClientOrdersFailure({ error }))
          )
        )
      )
    )
  });

  constructor(
    private actions$: Actions,
    private service: ShortFeatureService) { }
}
