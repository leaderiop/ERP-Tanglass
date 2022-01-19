import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Glass } from '@tanglass-erp/core/product';

import { GLASS_FEATURE_KEY, glassAdapter, State } from '../reducers/glass.reducer';

// Lookup the 'Glasses' feature state managed by NgRx
export const getGlassesState = createFeatureSelector<
State
>(GLASS_FEATURE_KEY);

const { selectAll, selectEntities } = glassAdapter.getSelectors();


export const getGlassesLoaded = createSelector(
  getGlassesState,
  (state: State) => state.loaded
);

export const getGlassesError = createSelector(
  getGlassesState,
  (state: State) => state.error
);


export const getAllGlasses = createSelector(
  getGlassesState,
  (state: State) => selectAll(state)
);

export const getGlassEntities = createSelector(
  getGlassesState,
  (state: State) => selectEntities(state)
);

export const getSelectedGlass = createSelector(
  getGlassesState,
  (state: State) => state.selectedGlass
);

export const getTypes = createSelector(
  getGlassesState,
  (state: State) => state.types
);

export const getColors = createSelector(
  getGlassesState,
  (state: State) => state.colors
);


/********************************************************************************* */
/****RETURN Glasses VIEW MODEL */
/********************************************************************************* */

export interface GlassesViewModel {
  glasses: Glass[],
}

export const selectGlassesViewModel = createSelector(
  getAllGlasses,
  (
    glasses: Glass[]
  ): GlassesViewModel => {
    return {
      glasses: glasses,
    };
  }
);
