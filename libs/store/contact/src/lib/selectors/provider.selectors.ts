import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PROVIDER_FEATURE_KEY, providerAdapter, State } from '../reducers/provider.reducer';

// Lookup the 'Providers' feature state managed by NgRx
export const getProvidersState = createFeatureSelector<
State
>(PROVIDER_FEATURE_KEY);

const { selectAll, selectEntities } = providerAdapter.getSelectors();


export const getProvidersLoaded = createSelector(
  getProvidersState,
  (state: State) => state.loaded
);

export const getProvidersError = createSelector(
  getProvidersState,
  (state: State) => state.error
);


export const getAllProviders = createSelector(
  getProvidersState,
  (state: State) => selectAll(state)
);

export const getProviderEntities = createSelector(
  getProvidersState,
  (state: State) => selectEntities(state)
);

export const getSelectedProvider = createSelector(
  getProvidersState,
  (state: State) => state.selectedProvider
);
