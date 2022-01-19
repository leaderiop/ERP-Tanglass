import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as EmployeesActions from './employees.actions';
import { ShortFeatureService } from '@tanglass-erp/core/common';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EmployeesEffects {


  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.loadEmployees),
      mergeMap((action) =>
        this.shortFeatureService.getAllEmployees().pipe(
          map((data) =>

            EmployeesActions.loadEmployeesSuccess({ employees: data.data.management_userProfile })
          ),
          catchError((error) => of(EmployeesActions.loadEmployeesFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shortFeatureService: ShortFeatureService,
  ) { }
}
