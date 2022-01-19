import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHORTSALEPOINT_FEATURE_KEY, shortSalePointAdapter, State } from './short-salePoint.reducer';

// Lookup the 'ShortSalePoint' feature state managed by NgRx
export const getShortSalePointState = createFeatureSelector<
  State
>(SHORTSALEPOINT_FEATURE_KEY);

const { selectAll, selectEntities } = shortSalePointAdapter.getSelectors();

export const getShortSalePointLoaded = createSelector(
  getShortSalePointState,
  (state: State) => state.loaded
);

export const getShortSalePointError = createSelector(
  getShortSalePointState,
  (state: State) => state.error
);

export const getAllShortSalePoint = createSelector(
  getShortSalePointState,
  (state: State) => selectAll(state)
);

export const getShortSalePointEntities = createSelector(
  getShortSalePointState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getShortSalePointState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getShortSalePointEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
