import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  WAREHOUSES_FEATURE_KEY,
  warehousesAdapter,
  WarehousesPartialState
} from '../reducers/warehouses.reducer';

// Lookup the 'Warehouses' feature state managed by NgRx
export const getWarehousesState = createFeatureSelector<
  WarehousesPartialState,
  State
>(WAREHOUSES_FEATURE_KEY);

const { selectAll, selectEntities } = warehousesAdapter.getSelectors();

export const getWarehousesLoaded = createSelector(
  getWarehousesState,
  (state: State) => state.loaded
);

export const getWarehousesError = createSelector(
  getWarehousesState,
  (state: State) => state.error
);

export const getAllWarehouses = createSelector(
  getWarehousesState,
  (state: State) => selectAll(state)
);

export const getWarehousesEntities = createSelector(
  getWarehousesState,
  (state: State) => selectEntities(state)
);

export const getSelectedWarehouse = createSelector(
  getWarehousesState,
  (state: State) => state.selectedWarehouse
);
