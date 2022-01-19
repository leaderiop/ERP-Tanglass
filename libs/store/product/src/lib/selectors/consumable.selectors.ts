import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Consumable } from '@tanglass-erp/core/product';

import { CONSUMABLE_FEATURE_KEY, consumableAdapter, State } from '../reducers/consumable.reducer';

// Lookup the 'Consumables' feature state managed by NgRx
export const getConsumablesState = createFeatureSelector<
State
>(CONSUMABLE_FEATURE_KEY);

const { selectAll, selectEntities } = consumableAdapter.getSelectors();


export const getConsumablesLoaded = createSelector(
  getConsumablesState,
  (state: State) => state.loaded
);

export const getConsumablesError = createSelector(
  getConsumablesState,
  (state: State) => state.error
);


export const getAllConsumables = createSelector(
  getConsumablesState,
  (state: State) => selectAll(state)
);

export const getConsumableEntities = createSelector(
  getConsumablesState,
  (state: State) => selectEntities(state)
);

export const getSelectedConsumable = createSelector(
  getConsumablesState,
  (state: State) => state.selectedConsumable
);


/********************************************************************************* */
/****RETURN ConsumableS VIEW MODEL */
/********************************************************************************* */

export interface ConsumablesViewModel {
  consumables: Consumable[],
}

export const selectConsumablesViewModel = createSelector(
  getAllConsumables,
  (
    consumables: Consumable[]
  ): ConsumablesViewModel => {
    return {
      consumables: consumables,
    };
  }
);
