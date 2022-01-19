import { ServiceService } from '@tanglass-erp/core/product';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ServiceActions from '../actions/service.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ServiceChildsEffects {

  loadServices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ServiceActions.loadServices),
      mergeMap(() =>
        this.serviceService.getAll().pipe(
          map((data) =>
            ServiceActions.loadServicesSuccess({services: data.data.product_service})
          ),
          catchError((error) =>
            of(ServiceActions.loadServicesFailure({ error }))
          )
        )
      )
    )
  });


  constructor(private actions$: Actions,
              private serviceService: ServiceService) {

              }
}
