import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StockAdjustmentsActions from '../actions/stock-adjustments.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StockAdjustmentService } from '@tanglass-erp/core/inventory';
import { of } from 'rxjs';
import { ToastService } from '@TanglassTheme/services/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class StockAdjustmentsEffects {
  loadStockAdjustments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockAdjustmentsActions.loadStockAdjustments),
      mergeMap(() =>
        this.stockAdjustmentService.getAll().pipe(
          map((data) =>
            StockAdjustmentsActions.loadStockAdjustmentsSuccess({
              stockAdjustments: data,
            })
          ),
          catchError((error) =>
            of(StockAdjustmentsActions.loadStockAdjustmentsFailure({ error }))
          )
        )
      )
    )
  );
  loadStockInHand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockAdjustmentsActions.loadStockInHand),
      mergeMap(() =>
        this.stockAdjustmentService.getAllSubstancesWarehouses().pipe(
          map((data) =>
            StockAdjustmentsActions.loadStockInHandSuccess({
              StockInHand: data.data.stock_warehouse_substance,
            })
          ),
          catchError((error) =>
            of(StockAdjustmentsActions.loadStockInHandFailure({ error }))
          )
        )
      )
    )
  );
  addAdjustment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StockAdjustmentsActions.addAdjustment),
      mergeMap((action) =>
        this.stockAdjustmentService.insertOne(action.adjustment).pipe(
          map((data) => {
            this.toastrService.showToast(
              'success',
              'Ajustements',
              'Ajouté avec succès'
            );
            this.router.navigate(['inventory/stockAdjustment']);
            return StockAdjustmentsActions.addAdjustmentSuccess({
              adjustment: data,
            });
          }),
          catchError((error) =>
            of(StockAdjustmentsActions.addAdjustmentFailure({ error }))
          )
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private stockAdjustmentService: StockAdjustmentService,
    private toastrService: ToastService,
    private router: Router
  ) {}
}
