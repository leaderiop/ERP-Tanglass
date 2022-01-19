import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHORT_PRODUCT_FEATURE_KEY,
  shortProductAdapter,
  ShortProductPartialState,
  State
} from './short-product.reducer';

// Lookup the 'ShortProduct' feature state managed by NgRx
export const getShortProductState = createFeatureSelector<
  ShortProductPartialState,
  State
>(SHORT_PRODUCT_FEATURE_KEY);

const { selectAll, selectEntities } = shortProductAdapter.getSelectors();

export const getShortProductLoaded = createSelector(
  getShortProductState,
  (state: State) => state.loaded
);

export const getShortProductError = createSelector(
  getShortProductState,
  (state: State) => state.error
);

export const getAllShortProduct = createSelector(
  getShortProductState,
  (state: State) => selectAll(state)
);

export const getShortProductEntities = createSelector(
  getShortProductState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getShortProductState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getShortProductEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
