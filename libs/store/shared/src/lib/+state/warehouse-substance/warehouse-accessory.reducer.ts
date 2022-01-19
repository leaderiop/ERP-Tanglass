import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as WarehouseAccessoryActions from './warehouse-accessory.actions';
import { Substance } from '@tanglass-erp/core/common';

export const WAREHOUSE_ACCESSORY_FEATURE_KEY = 'warehouseAccessory';

export interface State extends EntityState<Substance> {
  selectedId?: string | number; // which WarehouseAccessory record has been selected
  loaded: boolean; // has the WarehouseAccessory list been loaded
  error?: string | null; // last known error (if any)
}

export interface WarehouseAccessoryPartialState {
  readonly [WAREHOUSE_ACCESSORY_FEATURE_KEY]: State;
}

export const warehouseAccessoryAdapter: EntityAdapter<Substance> = createEntityAdapter<
Substance
>({
  selectId: (substance: Substance) => substance.substanceid,

});

export const initialState: State = warehouseAccessoryAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const warehouseAccessoryReducer = createReducer(
  initialState,
  on(WarehouseAccessoryActions.loadWarehouseAccessory, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    WarehouseAccessoryActions.loadWarehouseAccessorySuccess,
    (state, { warehouseAccessory }) =>
      warehouseAccessoryAdapter.setAll(warehouseAccessory, {
        ...state,
        loaded: true,
      })
  ),
  on(
    WarehouseAccessoryActions.loadWarehouseAccessoryFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return warehouseAccessoryReducer(state, action);
}
