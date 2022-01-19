import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CLIENT_ORDERS_FEATURE_KEY, CLientOrdersAdapter, State } from './orders-client.reducer';

export const getCLientOrdersState = createFeatureSelector<
  State
>(CLIENT_ORDERS_FEATURE_KEY);

const { selectAll, selectEntities } = CLientOrdersAdapter.getSelectors();

export const getCLientOrdersLoaded = createSelector(
  getCLientOrdersState,
  (state: State) => state.loaded
);

export const getCLientOrdersError = createSelector(
  getCLientOrdersState,
  (state: State) => state.error
);

export const getAllCLientOrders = createSelector(
  getCLientOrdersState,
  (state: State) => selectAll(state)
);

export const getCLientOrdersEntities = createSelector(
  getCLientOrdersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCLientOrdersState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCLientOrdersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
