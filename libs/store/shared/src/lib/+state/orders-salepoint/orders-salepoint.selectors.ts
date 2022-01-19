import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ORDERS_SALEPOINT_FEATURE_KEY,
  ordersSalepointAdapter,
  OrdersSalepointPartialState,
  State
} from './orders-salepoint.reducer';

// Lookup the 'OrdersSalepoint' feature state managed by NgRx
export const getOrdersSalepointState = createFeatureSelector<
  OrdersSalepointPartialState,
  State
>(ORDERS_SALEPOINT_FEATURE_KEY);

const { selectAll, selectEntities } = ordersSalepointAdapter.getSelectors();

export const getOrdersSalepointLoaded = createSelector(
  getOrdersSalepointState,
  (state: State) => state.loaded
);

export const getOrdersSalepointError = createSelector(
  getOrdersSalepointState,
  (state: State) => state.error
);

export const getAllOrdersSalepoint = createSelector(
  getOrdersSalepointState,
  (state: State) => selectAll(state)
);

export const getOrdersSalepointEntities = createSelector(
  getOrdersSalepointState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOrdersSalepointState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getOrdersSalepointEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
