import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as WarehousesActions from '../actions/warehouses.actions';
import { Warehouse } from '@tanglass-erp/core/inventory';

export const WAREHOUSES_FEATURE_KEY = 'warehouses';

export interface State extends EntityState<Warehouse> {
  selectedWarehouse?: Warehouse; // which Warehouses record has been selected
  loaded: boolean; // has the Warehouses list been loaded
  error?: string | null; // last known error (if any)
}

export interface WarehousesPartialState {
  readonly [WAREHOUSES_FEATURE_KEY]: State;
}

export const warehousesAdapter: EntityAdapter<Warehouse> = createEntityAdapter<
  Warehouse
>();

export const initialState: State = warehousesAdapter.getInitialState({
  // set initial required properties
  selectedWarehouse: null,
  loaded: false,
});

const warehousesReducer = createReducer(
  initialState,
  // Load
  on(WarehousesActions.loadWarehousesSuccess, (state, action) =>
    warehousesAdapter.setAll(action.warehouses, { ...state, loaded: true })
  ),
  on(WarehousesActions.loadWarehouseByIdSuccess, (state, action) =>
      (
        {
          ...state,
          selectedWarehouse: action.warehouse,
          error: null
        }
      )
  ),
  // Add
  on(WarehousesActions.addWarehouseSuccess, (state, action) =>
    warehousesAdapter.addOne(action.warehouse, state)
  ),
  // Update
  on(WarehousesActions.updateWarehouseSuccess, (state, action) =>
    warehousesAdapter.upsertOne(action.warehouse, state)
  ),
  // Remove
  on(WarehousesActions.removeWarehousesSuccess, (state, action) =>
    warehousesAdapter.removeMany(action.ids, state)
  )
  ,
  // Failure
  on(WarehousesActions.loadWarehousesFailure,
    WarehousesActions.loadWarehouseByIdFailure,
    WarehousesActions.addWarehouseFailure,
    WarehousesActions.updateWarehouseFailure,
    (state, { error }) => ({
      ...state,
      error,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return warehousesReducer(state, action);
}
