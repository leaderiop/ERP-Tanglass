import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalePoint } from '@tanglass-erp/core/management';

import { SALE_POINT_FEATURE_KEY, salePointAdapter, State } from '../reducers/sale-point-reducer';

// Lookup the 'SalePoints' feature state managed by NgRx
export const getSalePointsState = createFeatureSelector<
  State
>(SALE_POINT_FEATURE_KEY);

const { selectAll, selectEntities } = salePointAdapter.getSelectors();

export const getSalePointsLoaded = createSelector(
  getSalePointsState,
  (state: State) => state.loaded
);

export const getSalePointsError = createSelector(
  getSalePointsState,
  (state: State) => state.error
);

export const getAllSalePoints = createSelector(
  getSalePointsState,
  (state: State) => selectAll(state)
);

export const getSalePointsEntities = createSelector(
  getSalePointsState,
  (state: State) => selectEntities(state)
);

export const getSelectedSalePoint = createSelector(
  getSalePointsState,
  (state: State) => state.selectedSalePoint
);

/********************************************************************************* */
/****RETURN SALEPOINTS VIEW MODEL */
/********************************************************************************* */

export interface SalePointsViewModel {
  salePoints: SalePoint[];
}

export const selectSalePointsViewModel = createSelector(
  getAllSalePoints,
  (
    salePoints: SalePoint[]
  ): SalePointsViewModel => {
    return {
      salePoints: salePoints,
    };
  }
);
