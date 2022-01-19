import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CONSUMABLE_WAREHOUSE_FEATURE_KEY,
  ConsumableWarehouseAdapter,
  State
} from '../reducers/warehouseConsumable.reducer';

// Lookup the 'ConsumableWarehouses' feature state managed by NgRx
export const getConsumableWarehousesState = createFeatureSelector<
State
>(CONSUMABLE_WAREHOUSE_FEATURE_KEY);

const { selectAll, selectEntities } = ConsumableWarehouseAdapter.getSelectors();


export const getConsumableWarehousesLoaded = createSelector(
  getConsumableWarehousesState,
  (state: State) => state.loaded
);

export const getConsumableWarehousesError = createSelector(
  getConsumableWarehousesState,
  (state: State) => state.error
);


export const getAllConsumableWarehouses = createSelector(
  getConsumableWarehousesState,
  (state: State) => selectAll(state)
);

export const getConsumableWarehouseEntities = createSelector(
  getConsumableWarehousesState,
  (state: State) => selectEntities(state)
);



export const getSelectedWarehouse = createSelector(
  getConsumableWarehousesState,
  (state: State) => state.selectedWareHouse
);
