import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as CustomerSituationActions from './customer-situation.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CashBoxService } from '@tanglass-erp/core/cash-register';
import { of } from 'rxjs';

@Injectable()
export class CustomerSituationEffects {
  loadCustomerSituation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerSituationActions.loadCustomerSituation),
      mergeMap(
        (action) =>
          this.cashBoxService.getCustomerSituation(action.customer_id)
            .pipe(
              map(data =>
                CustomerSituationActions.loadCustomerSituationSuccess({customerSituation: data.data.customer_situation})
              ),
              catchError(err => of(CustomerSituationActions.loadCustomerSituationFailure({error: err})))
            )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cashBoxService: CashBoxService
    ) {}
}
