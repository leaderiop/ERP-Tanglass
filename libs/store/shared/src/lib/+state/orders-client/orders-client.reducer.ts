import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as CLientOrdersActions from './orders-client.actions';
import { ShortFeature } from '@tanglass-erp/core/common';

export const CLIENT_ORDERS_FEATURE_KEY = 'CLientOrders KEY';


export interface State extends EntityState<ShortFeature> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface CLientOrdersPartialState {
  readonly [CLIENT_ORDERS_FEATURE_KEY]: State;
}

export const CLientOrdersAdapter: EntityAdapter<any> = createEntityAdapter<
any
>();

export const initialState: State = CLientOrdersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const ordersClientReducer = createReducer(
  initialState,
  on(CLientOrdersActions.loadClientOrders, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CLientOrdersActions.loadClientOrdersSuccess, (state, { orders }) =>
    CLientOrdersAdapter.setAll(orders, { ...state, loaded: true })
  ),
  on(CLientOrdersActions.loadClientOrdersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ordersClientReducer(state, action);
}
