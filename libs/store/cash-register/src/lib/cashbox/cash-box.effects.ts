import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CashBoxActions from './cash-box.actions';
import { CashBoxService } from '@tanglass-erp/core/cash-register';
import { AuthFacadeService } from '@tanglass-erp/store/app';
import { catchError, filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShortFeatureService } from '@tanglass-erp/core/common';
import { CashBoxFacade } from '../cashbox/cash-box.facade';
import { ToastService } from '@TanglassTheme/services/toast.service';

@Injectable()
export class CashBoxEffects {
  loadCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxActions.loadCashBox),
      mergeMap((action) =>
        this.cashBoxService.getCashBoxById(action.id, action.salepoint_id).pipe(
          map((data) => {
            const cashBox = {
              ...data.data.cash_register_cash_box_by_pk,
              payments: data.data.sales_payment,
            };
            return CashBoxActions.loadCashBoxSuccess({ cashBox });
          }),
          catchError((error) => of(CashBoxActions.loadCashBoxFailure({ error })))
        )
      )
    )
  );

  addCashBox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxActions.addCashBox),
      mergeMap((action) =>
        this.cashBoxService.insertCashBox(action.cashBox).pipe(
          map(() => {
            this.toastrService.showToast(
              'info',
              'Verres',
              'Ajouté avec succès'
            );
            return [
              CashBoxActions.addCashBoxSuccess(),
              CashBoxActions.loadCashBoxSalePoints(),
            ];
          }),
          switchMap((actions) => actions),
          catchError((error) => of(CashBoxActions.addCashBoxFailure({ error })))
        )
      )
    )
  );

  addPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxActions.addPayment),
      mergeMap((action) =>
        this.cashBoxService.insertPayment(action.payment).pipe(
          map(() => {
    
            this.toastrService.showToast(
              'info',
              'Verres',
              'Paiement enregistré avec succès'
            );
            return this.cashBoxFacade.selectedCashBox$;
          }),
          switchMap((obj) =>
            obj.pipe(
              take(1),
              map((value) => {
                this.cashBoxFacade.loadCashBoxById(
                  value.id,
                  value.salepoint_id
                );
                return CashBoxActions.addPaymentSuccess();
              })
            )
          ),
          catchError((error) => of(CashBoxActions.addPaymentFailure({ error })))
        )
      )
    )
  );

  loadSalePoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashBoxActions.loadCashBoxSalePoints),
      mergeMap((action) =>
        this.authFacadeService.currentUser$.pipe(
          filter(e => !!e),
          take(1),
          switchMap((val) =>
            this.shortFeatureService.getAllSalePoints((val.role === 'admin' || !val.SalesPointsid)?null:[val.SalesPointsid]).pipe(
              map((data) =>
                CashBoxActions.loadCashBoxSalePointsSuccess({
                  salepoints: data.data.management_salesPoint,
                })
              ),
              catchError((error) => of(
                  CashBoxActions.loadCashBoxSalePointsFailure({ error })
                ))
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cashBoxService: CashBoxService,
    private cashBoxFacade: CashBoxFacade,
    private shortFeatureService: ShortFeatureService,
    private authFacadeService: AuthFacadeService,
    private toastrService: ToastService,

    ) {}
}
