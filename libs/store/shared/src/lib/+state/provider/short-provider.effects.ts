import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShortFeatureService } from '@tanglass-erp/core/common';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ShortProviderActions from './short-provider.actions';

@Injectable()
export class ShortProviderEffects {
  loadShortProvider$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShortProviderActions.loadShortProvider),
      mergeMap((action) =>
        this.shortFeatureService.getShortProviders().pipe(
          map((data) =>
          ShortProviderActions.loadShortProviderSuccess({shortProvider:data.data.contact_provider })
          ),
          catchError((error) =>
            of(ShortProviderActions.loadShortProviderFailure({ error }))
          )
        )
      )
    )
  });

  constructor(private actions$: Actions,
    private shortFeatureService: ShortFeatureService) {}
}
