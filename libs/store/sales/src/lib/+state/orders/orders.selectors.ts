import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ORDERS_FEATURE_KEY, ordersAdapter, OrdersPartialState, OrderState } from './orders.reducer';

// Lookup the 'Orders' feature state managed by NgRx
export const getOrdersState = createFeatureSelector<
  OrdersPartialState,
  OrderState
>(ORDERS_FEATURE_KEY);

const { selectAll, selectEntities } = ordersAdapter.getSelectors();

export const getOrdersLoaded = createSelector(
  getOrdersState,
  (state: OrderState) => state.loaded
);

export const getOrdersError = createSelector(
  getOrdersState,
  (state: OrderState) => state.error
);

export const getAllOrders = createSelector(
  getOrdersState,
  (state: OrderState) => selectAll(state)
);

export const getOrdersEntities = createSelector(
  getOrdersState,
  (state: OrderState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getOrdersState,
  (state: OrderState) => state.selectedId
);

export const getSelected = createSelector(
  getOrdersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getSelectedOrder = createSelector(
  getOrdersState,
  (state: OrderState) => state.selectedOrder
);
