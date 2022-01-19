import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DELIVERIES_FEATURE_KEY, deliveriesAdapter, DeliveriesPartialState, State } from './deliveries.reducer';

// Lookup the 'Deliveries' feature state managed by NgRx
export const getDeliveriesState = createFeatureSelector<
  DeliveriesPartialState,
  State
>(DELIVERIES_FEATURE_KEY);

const { selectAll, selectEntities } = deliveriesAdapter.getSelectors();

export const getDeliveriesLoaded = createSelector(
  getDeliveriesState,
  (state: State) => state.loaded
);

export const getDeliveriesError = createSelector(
  getDeliveriesState,
  (state: State) => state.error
);

export const getAllDeliveries = createSelector(
  getDeliveriesState,
  (state: State) => selectAll(state)
);

export const getDeliveriesEntities = createSelector(
  getDeliveriesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDeliveriesState,
  (state: State) => state.selectedId
);

export const getSelectedDelivery = createSelector(
  getDeliveriesState,
  (state: State) => state.selectedDelivery);

export const getSelectedDeliveryItems = createSelector(
  getDeliveriesState,
  (state: State) => state.selectedItems
);
