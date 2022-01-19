import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CASHBOX_FEATURE_KEY, cashBoxAdapter, CashBoxPartialState, State } from './cash-box.reducer';

// Lookup the 'CashBox' feature state managed by NgRx
export const getCashBoxState = createFeatureSelector<
  CashBoxPartialState,
  State
>(CASHBOX_FEATURE_KEY);

const { selectAll, selectEntities } = cashBoxAdapter.getSelectors();

export const getSalePointsLoaded = createSelector(
  getCashBoxState,
  (state: State) => state.loaded
);

export const getSalePointsError = createSelector(
  getCashBoxState,
  (state: State) => state.error
);

export const getAllSalePoints = createSelector(getCashBoxState, (state: State) =>
  selectAll(state)
);


export const getSelectedCashBox = createSelector(
  getCashBoxState,
  (state: State) => state.selectedCashBox
);
