import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  WAREHOUSE_ACCESSORY_FEATURE_KEY,
  warehouseAccessoryAdapter,
  WarehouseAccessoryPartialState
} from './warehouse-accessory.reducer';

// Lookup the 'WarehouseAccessory' feature state managed by NgRx
export const getWarehouseAccessoryState = createFeatureSelector<
  WarehouseAccessoryPartialState,
  State
>(WAREHOUSE_ACCESSORY_FEATURE_KEY);

const { selectAll, selectEntities } = warehouseAccessoryAdapter.getSelectors();

export const getWarehouseAccessoryLoaded = createSelector(
  getWarehouseAccessoryState,
  (state: State) => state.loaded
);

export const getWarehouseAccessoryError = createSelector(
  getWarehouseAccessoryState,
  (state: State) => state.error
);

export const getAllWarehouseAccessory = createSelector(
  getWarehouseAccessoryState,
  (state: State) => selectAll(state)
);

export const getWarehouseAccessoryEntities = createSelector(
  getWarehouseAccessoryState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWarehouseAccessoryState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getWarehouseAccessoryEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
