import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as OrdersActions from './orders.actions';
import { DetailedOrder, Order as OrdersEntity } from '@tanglass-erp/core/sales';

export const ORDERS_FEATURE_KEY = 'orders';

export interface OrderState extends EntityState<OrdersEntity> {
  selectedId?: string | number; // which Orders record has been selected
  selectedOrder: DetailedOrder;
  loaded: boolean; // has the Orders list been loaded
  error?: string | null; // last known error (if any)
}

export interface OrdersPartialState {
  readonly [ORDERS_FEATURE_KEY]: OrderState;
}

export const ordersAdapter: EntityAdapter<OrdersEntity> = createEntityAdapter<
  OrdersEntity
>();

export const initialStateOrder: OrderState = ordersAdapter.getInitialState({
  // set initial required properties
  selectedOrder: null,
  loaded: false,
  error: null,
});

const ordersReducer = createReducer(
  initialStateOrder,
  on(OrdersActions.loadOrders, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, { ...state, loaded: true })
  ),
  on(OrdersActions.removeOrderSuccess, (state, { ids }) =>
    ordersAdapter.removeMany(ids, state)
  ),
  on(OrdersActions.loadOrderByIdSuccess, (state, action) => ({
    ...state,
    error: null,
    selectedOrder: action.order,
  })),
  on(OrdersActions.addOrderSuccess, (state, action) =>
    ordersAdapter.addOne(action.order, state)
  ),

  on(OrdersActions.selectOrder, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(OrdersActions.clearSelection, (state) => ({
    ...state,
    selectedOrder: null,
    selectedId: null,
  })),
  on(OrdersActions.updateOrderSuccess,(state, {order}) =>
  ordersAdapter.updateOne({id: order.id, changes: order}, state)
),
  on(
    OrdersActions.loadOrdersFailure,
    OrdersActions.loadOrderByIdFailure,
    OrdersActions.addOrderFailure,
    OrdersActions.updateOrderFailure,
    OrdersActions.removeOrderFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducerOrder(state: OrderState | undefined, action: Action) {
  return ordersReducer(state, action);
}
