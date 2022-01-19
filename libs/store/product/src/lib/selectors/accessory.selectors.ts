import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Accessory } from '@tanglass-erp/core/product';

import { ACCESSORY_FEATURE_KEY, accessoryAdapter, State } from '../reducers/accessory.reducer';

// Lookup the 'Companies' feature state managed by NgRx
export const getAccessoriesState = createFeatureSelector<
State
>(ACCESSORY_FEATURE_KEY);

const { selectAll, selectEntities } = accessoryAdapter.getSelectors();


export const getAccessoriesLoaded = createSelector(
  getAccessoriesState,
  (state: State) => state.loaded
);

export const getAccessoriesError = createSelector(
  getAccessoriesState,
  (state: State) => state.error
);


export const getAllAccessories = createSelector(
  getAccessoriesState,
  (state: State) => selectAll(state)
);

export const getAccessoryEntities = createSelector(
  getAccessoriesState,
  (state: State) => selectEntities(state)
);

export const getSelectedAccessory = createSelector(
  getAccessoriesState,
  (state: State) => state.selectedAccessory
);


/********************************************************************************* */
/****RETURN COMPANIES VIEW MODEL */
/********************************************************************************* */

export interface AccessoriesViewModel {
  accessories: Accessory[],
}

export const selectAccessoriesViewModel = createSelector(
  getAllAccessories,
  (
    accessories: Accessory[]
  ): AccessoriesViewModel => {
    return {
      accessories: accessories,
    };
  }
);
