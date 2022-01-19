import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ShortCompanyActions from './short-company.actions';
import { ShortFeatureService } from '@tanglass-erp/core/common';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShortCompanyEffects {
  loadShortCompany$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShortCompanyActions.loadShortCompany),
      mergeMap(() =>
        this.companieService.getAllCompanies().pipe(
          map((data) =>
            ShortCompanyActions.loadShortCompanySuccess({ shortCompany: data.data.management_company })
          ),
          catchError((error) =>
            of(ShortCompanyActions.loadShortCompanyFailure({ error }))
          )
        )
      )
    )
  });

  constructor(private actions$: Actions,
    private companieService: ShortFeatureService) { }
}
