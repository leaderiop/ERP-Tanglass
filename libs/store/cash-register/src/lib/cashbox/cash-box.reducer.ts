import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as CashBoxActions from './cash-box.actions';
import { ShortFeature } from '@tanglass-erp/core/common';
import { CashBox } from '@tanglass-erp/core/cash-register';

export const CASHBOX_FEATURE_KEY = 'cashBox';

export interface State extends EntityState<ShortFeature> {
  selectedCashBox: CashBox;
  loaded: boolean; // has the CashBox list been loaded
  error?: string | null; // last known error (if any)
}

export interface CashBoxPartialState {
  readonly [CASHBOX_FEATURE_KEY]: State;
}

export const cashBoxAdapter: EntityAdapter<ShortFeature> = createEntityAdapter<
  ShortFeature
>();

export const initialState: State = cashBoxAdapter.getInitialState({
  // set initial required properties
  selectedCashBox: null,
  loaded: false,
});

const cashBoxReducer = createReducer(
  initialState,
  on(CashBoxActions.loadCashBoxSalePoints, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CashBoxActions.loadCashBox, (state) => ({
    ...state,
    selectedCashBox: null,
    error: null,
  })),
  on(CashBoxActions.loadCashBoxSalePointsSuccess, (state, { salepoints }) =>
    cashBoxAdapter.setAll(salepoints, {...state, loaded: true, error: null})
  ),
  on(CashBoxActions.loadCashBoxSuccess, (state, { cashBox }) =>
    ({...state, selectedCashBox: cashBox})
  ),
  on(
    CashBoxActions.loadCashBoxFailure,
    CashBoxActions.loadCashBoxSalePointsFailure,
    CashBoxActions.addCashBoxFailure,
    CashBoxActions.addPaymentFailure,
    (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return cashBoxReducer(state, action);
}
