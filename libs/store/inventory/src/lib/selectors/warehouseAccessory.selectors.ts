import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  ACCESSORY_WAREHOUSE_FEATURE_KEY,
  accessoryWarehouseAdapter,
  State
} from '../reducers/warehouseAccessory.reducer';

// Lookup the 'AccessoryWarehouses' feature state managed by NgRx
export const getAccessoryWarehousesState = createFeatureSelector<
State
>(ACCESSORY_WAREHOUSE_FEATURE_KEY);

const { selectAll, selectEntities } = accessoryWarehouseAdapter.getSelectors();


export const getAccessoryWarehousesLoaded = createSelector(
  getAccessoryWarehousesState,
  (state: State) => state.loaded
);

export const getAccessoryWarehousesError = createSelector(
  getAccessoryWarehousesState,
  (state: State) => state.error
);


export const getAllAccessoryWarehouses = createSelector(
  getAccessoryWarehousesState,
  (state: State) => selectAll(state)
);

export const getAccessoryWarehouseEntities = createSelector(
  getAccessoryWarehousesState,
  (state: State) => selectEntities(state)
);


export const getSelectedWarehouse = createSelector(
  getAccessoryWarehousesState,
  (state: State) => state.selectedAccessoryWarehouse
);

