import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, SUPPLY_FEATURE_KEY, supplyAdapter } from '../reducers/supply.reducer';

// Lookup the 'Supplies' feature state managed by NgRx
export const getSuppliesState = createFeatureSelector<
State
>(SUPPLY_FEATURE_KEY);

const { selectAll, selectEntities } = supplyAdapter.getSelectors();


export const getSuppliesLoaded = createSelector(
  getSuppliesState,
  (state: State) => state.loaded
);

export const getSuppliesError = createSelector(
  getSuppliesState,
  (state: State) => state.error
);


export const getAllSupplies = createSelector(
  getSuppliesState,
  (state: State) => selectAll(state)
);

export const getSupplyEntities = createSelector(
  getSuppliesState,
  (state: State) => selectEntities(state)
);

export const getSelectedSupply = createSelector(
  getSuppliesState,
  (state: State) => state.selectedSupply
);


/********************************************************************************* */
/****RETURN SUPPLIES VIEW MODEL */
/********************************************************************************* */

export interface SuppliesViewModel {
  supplies: any[],
}

export const selectSuppliesViewModel = createSelector(
  getAllSupplies,
  (
    supplies: any[]
  ): SuppliesViewModel => {
    return {
      supplies: supplies,
    };
  }
);
