import { SalePointService } from '@tanglass-erp/core/management';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as SalePointActions from '../actions/salePoint.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SalePointEffects {
  loadSalePoints$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SalePointActions.loadSalePoints),
      mergeMap((action) =>
        this.salePointService.getAll().pipe(
          map((data) =>
            SalePointActions.loadSalePointsSuccess({
              salePoints: data.data.management_salesPoint,
            })
          ),
          catchError((error) =>
            of(SalePointActions.loadSalePointsFailure({ error }))
          )
        )
      )
    );
  });

  createSalePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SalePointActions.addSalePoint),
      mergeMap((action) =>
        this.salePointService.insertOne(action.salePoint).pipe(
          map((data) =>
            SalePointActions.addSalePointSuccess({
              salePoint: data.data.insert_management_salesPoint_one,
            })
          ),
          catchError((error) =>
            of(SalePointActions.addSalePointFailure({ error }))
          )
        )
      )
    );
  });

  getSalePointById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SalePointActions.loadSalePointById),
      mergeMap((action) =>
        this.salePointService.getOneById(action.id).pipe(
          map((data) =>
            SalePointActions.loadSalePointByIdSuccess({
              salePoint: data.data.management_salesPoint_by_pk,
            })
          ),
          catchError((error) =>
            of(SalePointActions.loadSalePointByIdFailure({ error }))
          )
        )
      )
    );
  });

  updateSalePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SalePointActions.updateSalePoint),
      mergeMap((action) =>
        this.salePointService.updateOne(action.salePoint).pipe(
          map((data) =>
            SalePointActions.updateSalePointSuccess({
              salePoint: data.data.update_management_salesPoint_by_pk,
            })
          ),
          catchError((error) =>
            of(SalePointActions.updateSalePointFailure({ error }))
          )
        )
      )
    );
  });

  removeSalePoint$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SalePointActions.removeSalePoint),
      mergeMap((action) =>
        this.salePointService.removeOne(action.salePointId).pipe(
          map((data) =>
            SalePointActions.removeSalePointSuccess({
              salePointId: data.data.delete_management_salesPoint_by_pk.id,
            })
          ),
          catchError((error) =>
            of(SalePointActions.removeSalePointFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private salePointService: SalePointService
  ) {}
}
