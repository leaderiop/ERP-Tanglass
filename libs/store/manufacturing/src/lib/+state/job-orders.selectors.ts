import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JOB_ORDERS_FEATURE_KEY, jobOrdersAdapter, JobOrdersPartialState, State } from './job-orders.reducer';

// Lookup the 'JobOrders' feature state managed by NgRx
export const getJobOrdersState = createFeatureSelector<
  JobOrdersPartialState,
  State
>(JOB_ORDERS_FEATURE_KEY);

const { selectAll, selectEntities } = jobOrdersAdapter.getSelectors();

export const getJobOrdersLoaded = createSelector(
  getJobOrdersState,
  (state: State) => state.loaded
);

export const getJobOrdersError = createSelector(
  getJobOrdersState,
  (state: State) => state.error
);

export const getAllJobOrders = createSelector(
  getJobOrdersState,
  (state: State) => selectAll(state)
);

export const getJobOrdersEntities = createSelector(
  getJobOrdersState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getJobOrdersState,
  (state: State) => state.selectedId
);
export const getSelectedJobOrder = createSelector(
  getJobOrdersState,
  (state: State) => state.selectedJobOrder
);
export const getSelectedJobOrderGlasses = createSelector(
  getJobOrdersState,
  (state: State) => state.selectedGlasses
);

export const getSelected = createSelector(
  getJobOrdersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
export const getSelectedGlassLine = createSelector(
  getJobOrdersState,
  (state: State) => state.selectedGlass
);


export const getBarCodeState = createSelector(
  getJobOrdersState,
  (state: State) => state.withBarCodes
);
