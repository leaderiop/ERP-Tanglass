import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as SubstancesActions from '../actions/substances.actions';
import { SubstanceService } from '@tanglass-erp/core/product';

@Injectable()
export class SubstancesEffects {
  loadSubstances$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SubstancesActions.loadSubstances),
      mergeMap(() =>
        this.substanceService.getAll().pipe(
          map((data) =>
            SubstancesActions.loadSubstancesSuccess({ substances: data })
          ),
          catchError((error) =>
            of(SubstancesActions.loadSubstancesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private substanceService: SubstanceService
  ) {}
}
