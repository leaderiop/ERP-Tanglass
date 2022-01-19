import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as OrdersSalepointActions from './orders-salepoint.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShortFeatureService } from '@tanglass-erp/core/common';

@Injectable()
export class OrdersSalepointEffects {
  loadOrdersSalepoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersSalepointActions.loadOrdersSalepoint),
      mergeMap((action) =>
        this.shortFeatureService
          .getAllOrdersBySalepoint(action.salepoint_id)
          .pipe(
            map((data) =>
              OrdersSalepointActions.loadOrdersSalepointSuccess({
                ordersSalepoint: data.data.sales_order,
              })
            ),
            catchError((error) =>
              of(OrdersSalepointActions.loadOrdersSalepointFailure({ error }))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shortFeatureService: ShortFeatureService
  ) {}
}
