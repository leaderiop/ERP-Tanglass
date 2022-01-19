import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  STOCKADJUSTMENTS_FEATURE_KEY,
  stockAdjustmentsAdapter,
  StockAdjustmentsPartialState
} from '../reducers/stock-adjustments.reducer';

// Lookup the 'StockAdjustments' feature state managed by NgRx
export const getStockAdjustmentsState = createFeatureSelector<
  StockAdjustmentsPartialState,
  State
>(STOCKADJUSTMENTS_FEATURE_KEY);

const { selectAll, selectEntities } = stockAdjustmentsAdapter.getSelectors();

export const getStockAdjustmentsLoaded = createSelector(
  getStockAdjustmentsState,
  (state: State) => state.loaded
);

export const getStockAdjustmentsError = createSelector(
  getStockAdjustmentsState,
  (state: State) => state.error
);

export const getAllStockAdjustments = createSelector(
  getStockAdjustmentsState,
  (state: State) => selectAll(state)
);

export const getStockAdjustmentsEntities = createSelector(
  getStockAdjustmentsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getStockAdjustmentsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getStockAdjustmentsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getStockInHand = createSelector(
  getStockAdjustmentsState,
  (state: State) => state.stockInHand
);
