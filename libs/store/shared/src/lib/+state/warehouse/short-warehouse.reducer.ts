import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ShortWarehouseActions from './short-warehouse.actions';
import { ShortWarehouse } from '@tanglass-erp/core/common';

export const SHORTWAREHOUSE_FEATURE_KEY = 'shortWarehouse';

export interface State extends EntityState<ShortWarehouse> {
  selectedId?: string ; // which ShortWarehouse record has been selected
  loaded: boolean; // has the ShortWarehouse list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShortWarehousePartialState {
  readonly [SHORTWAREHOUSE_FEATURE_KEY]: State;
}

export const shortWarehouseAdapter: EntityAdapter<ShortWarehouse> = createEntityAdapter<
ShortWarehouse
>({

});

export const initialState: State = shortWarehouseAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const shortWarehouseReducer = createReducer(
  initialState,
  on(ShortWarehouseActions.loadShortWarehouse, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    ShortWarehouseActions.loadShortWarehouseSuccess,
    (state, { shortWarehouse }) =>
      shortWarehouseAdapter.setAll(shortWarehouse, { ...state, loaded: true })
  ),
  on(ShortWarehouseActions.loadShortWarehouseFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return shortWarehouseReducer(state, action);
}
