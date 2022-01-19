import { CompaniesService } from '@tanglass-erp/core/management';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CompaniesActions from '../actions/companies.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CompaniesEffects {

  loadCompanies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActions.loadCompanies),
      mergeMap( () =>
        this.companieService.getAll().pipe(
          map((data) =>
          CompaniesActions.loadCompaniesSuccess({companies: data.data.management_company})
          ),
          catchError((error) =>
            of(CompaniesActions.loadCompaniesFailure({ error }))
          )
        )
      )
    )
  });

  insertCompanie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActions.addCompanie),
      mergeMap((action) =>
        this.companieService.insertOne(action.companie).pipe(
          map((data) =>
          CompaniesActions.addCompanieSuccess({companie: data.data.insert_management_company_one})
          ),
          catchError((error) =>
            of(CompaniesActions.addCompanieFailure({ error }))
          )
        )
      )
    )
  });


  getCompanieById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActions.loadCompanieById),
      mergeMap((action) =>
        this.companieService.getOneById(action.id).pipe(
          map((data) =>
          CompaniesActions.loadCompanieByIdSuccess({companie: data.data.management_company_by_pk})
          ),
          catchError((error) =>
            of(CompaniesActions.loadCompanieByIdFailure({ error }))
          )
        )
      )
    )
  });

  updateCompanie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActions.updateCompanie),
      mergeMap((action) =>
        this.companieService.updateOne(action.companie).pipe(
          map((data) =>
          CompaniesActions.updateCompanieSuccess({companie: data.data.update_management_company_by_pk})
          ),
          catchError((error) =>
            of(CompaniesActions.updateCompanieFailure({ error }))
          )
        )
      )
    )
  });

  removeCompanie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CompaniesActions.removeCompanie),
      mergeMap((action) =>
        this.companieService.removeOne(action.companieId).pipe(
          map((data) =>
            CompaniesActions.removeCompanieSuccess({companieId: data.data.delete_management_company_by_pk.id})
          ),
          catchError((error) =>
            of(CompaniesActions.removeCompanieFailure({ error }))
          )
        )
      )
    )
  });





  constructor(private actions$: Actions,
              private companieService: CompaniesService) {}
}
