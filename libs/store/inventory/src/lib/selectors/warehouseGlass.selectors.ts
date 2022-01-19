import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GLASS_WAREHOUSE_FEATURE_KEY, glassWarehouseAdapter, State } from '../reducers/warehouseGlass.reducer';

// Lookup the 'GlassWarehouses' feature state managed by NgRx
export const getGlassWarehousesState = createFeatureSelector<
State
>(GLASS_WAREHOUSE_FEATURE_KEY);

const { selectAll, selectEntities } = glassWarehouseAdapter.getSelectors();


export const getGlassWarehousesLoaded = createSelector(
  getGlassWarehousesState,
  (state: State) => state.loaded
);

export const getGlassWarehousesError = createSelector(
  getGlassWarehousesState,
  (state: State) => state.error
);


export const getAllGlassWarehouses = createSelector(
  getGlassWarehousesState,
  (state: State) => selectAll(state)
);

export const getGlassWarehouseEntities = createSelector(
  getGlassWarehousesState,
  (state: State) => selectEntities(state)
);

export const getSelectedWarehouse = createSelector(
  getGlassWarehousesState,
  (state: State) => state.selectedWarehouse
);
