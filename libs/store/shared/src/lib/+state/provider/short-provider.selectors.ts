import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHORT_PROVIDER_FEATURE_KEY,
  shortProviderAdapter,
  ShortProviderPartialState,
  State
} from './short-provider.reducer';

// Lookup the 'ShortProvider' feature state managed by NgRx
export const getShortProviderState = createFeatureSelector<
  ShortProviderPartialState,
  State
>(SHORT_PROVIDER_FEATURE_KEY);

const { selectAll, selectEntities } = shortProviderAdapter.getSelectors();

export const getShortProviderLoaded = createSelector(
  getShortProviderState,
  (state: State) => state.loaded
);

export const getShortProviderError = createSelector(
  getShortProviderState,
  (state: State) => state.error
);

export const getAllShortProvider = createSelector(
  getShortProviderState,
  (state: State) => selectAll(state)
);

export const getShortProviderEntities = createSelector(
  getShortProviderState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getShortProviderState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getShortProviderEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
