import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  WAREHOUSE_GLASS_FEATURE_KEY,
  warehouseGlassAdapter,
  WarehouseGlassPartialState
} from './warehouse-glass.reducer';

// Lookup the 'WarehouseSubstance' feature state managed by NgRx
export const getWarehouseGlassState = createFeatureSelector<
WarehouseGlassPartialState,
  State
>(WAREHOUSE_GLASS_FEATURE_KEY);

const { selectAll, selectEntities } = warehouseGlassAdapter.getSelectors();

export const getWarehouseGlassLoaded = createSelector(
  getWarehouseGlassState,
  (state: State) => state.loaded
);

export const getWarehouseGlassError = createSelector(
  getWarehouseGlassState,
  (state: State) => state.error
);

export const getAllWarehouseGlass = createSelector(
  getWarehouseGlassState,
  (state: State) => selectAll(state)
);

export const getWarehouseGlassEntities = createSelector(
  getWarehouseGlassState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWarehouseGlassState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getWarehouseGlassEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
