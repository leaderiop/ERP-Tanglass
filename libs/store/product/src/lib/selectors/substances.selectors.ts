import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  SUBSTANCES_FEATURE_KEY,
  substancesAdapter,
  SubstancesPartialState
} from '../reducers/substances.reducer';

// Lookup the 'Substances' feature state managed by NgRx
export const getSubstancesState = createFeatureSelector<
  SubstancesPartialState,
  State
>(SUBSTANCES_FEATURE_KEY);

const { selectAll, selectEntities } = substancesAdapter.getSelectors();

export const getSubstancesLoaded = createSelector(
  getSubstancesState,
  (state: State) => state.loaded
);

export const getSubstancesError = createSelector(
  getSubstancesState,
  (state: State) => state.error
);

export const getAllSubstances = createSelector(
  getSubstancesState,
  (state: State) => selectAll(state)
);

export const getSubstancesEntities = createSelector(
  getSubstancesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSubstancesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getSubstancesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
