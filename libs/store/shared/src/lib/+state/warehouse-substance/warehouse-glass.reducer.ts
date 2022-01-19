import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as WarehouseGlassActions from './warehouse-glass.actions';
import { Substance } from '@tanglass-erp/core/common';

export const WAREHOUSE_GLASS_FEATURE_KEY = 'warehouseSubstance';

export interface State extends EntityState<Substance> {
  selectedId?: string | number;// which WarehouseSubstance record has been selected

  loaded: boolean; // has the WarehouseSubstance list been loaded
  error?: string | null; // last known error (if any)
}

export interface WarehouseGlassPartialState {
  readonly [WAREHOUSE_GLASS_FEATURE_KEY]: State;
}

export const warehouseGlassAdapter: EntityAdapter<Substance> = createEntityAdapter<
Substance
>({
  selectId: (substance: Substance) => substance.substanceid,
});

export const initialState: State = warehouseGlassAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const warehouseGlassReducer = createReducer(
  initialState,
  on(WarehouseGlassActions.loadWarehouseGlasses, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    WarehouseGlassActions.loadWarehouseGlassesSuccess,
    (state, { warehouseGlass }) =>
      warehouseGlassAdapter.setAll(warehouseGlass, {
        ...state,
        loaded: true,
      })
  ),
  on(
    WarehouseGlassActions.loadWarehouseGlassesFailure,
    (state, { error }) => ({ ...state, error })
  ),

);

export function reducer(state: State , action: Action) {
  return warehouseGlassReducer(state, action);

}
