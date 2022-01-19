import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, TRANSFERORDER_FEATURE_KEY, transferOrderAdapter } from '../reducers/transferOrder.reducer';

// Lookup the 'TransferOrders' feature state managed by NgRx
export const getTransferOrdersState = createFeatureSelector<
State
>(TRANSFERORDER_FEATURE_KEY);

const { selectAll, selectEntities } = transferOrderAdapter.getSelectors();


export const getTransferOrdersLoaded = createSelector(
  getTransferOrdersState,
  (state: State) => state.loaded
);

export const getTransferOrdersError = createSelector(
  getTransferOrdersState,
  (state: State) => state.error
);


export const getAllTransferOrders = createSelector(
  getTransferOrdersState,
  (state: State) => selectAll(state)
);

export const getTransferOrderEntities = createSelector(
  getTransferOrdersState,
  (state: State) => selectEntities(state)
);

export const getSelectedTransferOrder = createSelector(
  getTransferOrdersState,
  (state: State) => state.selectedTransferOrder
);
