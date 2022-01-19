import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as DeliveriesActions from './deliveries.actions';
import { PurchaseDelivery, PurchaseItem } from '@tanglass-erp/core/purchase';

export const DELIVERIES_FEATURE_KEY = 'deliveries';

export interface State extends EntityState<PurchaseDelivery> {
  selectedId?: string | number; // which deliveries record has been selected
  selectedItems?: PurchaseItem[];
  selectedDelivery?:PurchaseDelivery;
  loaded: boolean; // has the deliveries list been loaded
  error?: string | null; // last known error (if any)
}

export interface DeliveriesPartialState {
  readonly [DELIVERIES_FEATURE_KEY]: State;
}

export const deliveriesAdapter: EntityAdapter<PurchaseDelivery> = createEntityAdapter<
  PurchaseDelivery
>();

export const initialState: State = deliveriesAdapter.getInitialState({
  // set initial required properties
  selectedItems: [],
  selectedDelivery:null,
  loaded: false,
});

const deliveriesReducer = createReducer(
  initialState,
  on(DeliveriesActions.loadDeliveries, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DeliveriesActions.loadDeliveriesSuccess, (state, { deliveries }) =>
    deliveriesAdapter.setAll(deliveries, { ...state, loaded: true })
  ),
  on(DeliveriesActions.loadDeliveryByIdSuccess, (state, { delivery }) => ({
    ...state,
    selectedDelivery: delivery,
    selectedItems: delivery.delivery_items,
  })),
  on(DeliveriesActions.addDeliverySuccess, (state, { delivery }) =>
    deliveriesAdapter.addOne(delivery, state)
  ),
  on(DeliveriesActions.removeDeliverySuccess, (state, { ids }) =>
    deliveriesAdapter.removeMany(ids, state)
  ),
  on(DeliveriesActions.addDeliveryItem, (state, { item }) => ({
    ...state,
    selectedItems: [...state.selectedItems, item]  ,
  })),
  on(DeliveriesActions.clearDeliveryItems, (state) => ({
    ...state,
    selectedItems: [],
  })),
  on(
    DeliveriesActions.loadDeliveriesFailure,
    DeliveriesActions.loadDeliveryByIdFailure,
    DeliveriesActions.addDeliveryFailure,
    DeliveriesActions.removeDeliveryFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return deliveriesReducer(state, action);
}
