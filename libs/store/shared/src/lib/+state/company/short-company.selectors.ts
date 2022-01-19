import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHORTCOMPANY_FEATURE_KEY,
  shortCompanyAdapter,
  ShortCompanyPartialState,
  State
} from './short-company.reducer';

// Lookup the 'ShortCompany' feature state managed by NgRx
export const getShortCompanyState = createFeatureSelector<
  ShortCompanyPartialState,
  State
>(SHORTCOMPANY_FEATURE_KEY);

const { selectAll, selectEntities } = shortCompanyAdapter.getSelectors();

export const getShortCompanyLoaded = createSelector(
  getShortCompanyState,
  (state: State) => state.loaded
);

export const getShortCompanyError = createSelector(
  getShortCompanyState,
  (state: State) => state.error
);

export const getAllShortCompany = createSelector(
  getShortCompanyState,
  (state: State) => selectAll(state)
);

export const getShortCompanyEntities = createSelector(
  getShortCompanyState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getShortCompanyState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getShortCompanyEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
