import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CUSTOMER_SITUATION_FEATURE_KEY,
  customerSituationAdapter,
  CustomerSituationPartialState,
  State
} from './customer-situation.reducer';

// Lookup the 'CustomerSituation' feature state managed by NgRx
export const getCustomerSituationState = createFeatureSelector<
  CustomerSituationPartialState,
  State
>(CUSTOMER_SITUATION_FEATURE_KEY);

const { selectAll, selectEntities } = customerSituationAdapter.getSelectors();

export const getCustomerSituationLoaded = createSelector(
  getCustomerSituationState,
  (state: State) => state.loaded
);

export const getCustomerSituationError = createSelector(
  getCustomerSituationState,
  (state: State) => state.error
);

export const getAllCustomerSituation = createSelector(
  getCustomerSituationState,
  (state: State) => selectAll(state)
);

export const getCustomerSituationEntities = createSelector(
  getCustomerSituationState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCustomerSituationState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCustomerSituationEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
