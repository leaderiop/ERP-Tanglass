import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHORTWAREHOUSE_FEATURE_KEY,
  shortWarehouseAdapter,
  ShortWarehousePartialState,
  State
} from './short-warehouse.reducer';

// Lookup the 'ShortWarehouse' feature state managed by NgRx
export const getShortWarehouseState = createFeatureSelector<
  ShortWarehousePartialState,
  State
>(SHORTWAREHOUSE_FEATURE_KEY);

const { selectAll, selectEntities } = shortWarehouseAdapter.getSelectors();

export const getShortWarehouseLoaded = createSelector(
  getShortWarehouseState,
  (state: State) => state.loaded
);

export const getShortWarehouseError = createSelector(
  getShortWarehouseState,
  (state: State) => state.error
);

export const getAllShortWarehouse = createSelector(
  getShortWarehouseState,
  (state: State) => selectAll(state)
);

export const getShortWarehouseEntities = createSelector(
  getShortWarehouseState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getShortWarehouseState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getShortWarehouseEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
