import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as OrdersSalepointActions from './orders-salepoint.actions';
import { OrdersSalepointEntity } from './orders-salepoint.models';

export const ORDERS_SALEPOINT_FEATURE_KEY = 'ordersSalepoint';

export interface State extends EntityState<OrdersSalepointEntity> {
  selectedId?: string | number; // which OrdersSalepoint record has been selected
  loaded: boolean; // has the OrdersSalepoint list been loaded
  error?: string | null; // last known error (if any)
}

export interface OrdersSalepointPartialState {
  readonly [ORDERS_SALEPOINT_FEATURE_KEY]: State;
}

export const ordersSalepointAdapter: EntityAdapter<OrdersSalepointEntity> = createEntityAdapter<
  OrdersSalepointEntity
>();

export const initialState: State = ordersSalepointAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const ordersSalepointReducer = createReducer(
  initialState,
  on(OrdersSalepointActions.loadOrdersSalepoint, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    OrdersSalepointActions.loadOrdersSalepointSuccess,
    (state, { ordersSalepoint }) =>
      ordersSalepointAdapter.setAll(ordersSalepoint, { ...state, loaded: true })
  ),
  on(OrdersSalepointActions.loadOrdersSalepointFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ordersSalepointReducer(state, action);
}
