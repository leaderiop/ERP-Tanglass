import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ConsumablesActions from '../actions/consumable.actions';
import { Consumable, DetailedConsumable } from '@tanglass-erp/core/product';
import * as ProductsActions from '../actions/product.actions';

export const CONSUMABLE_FEATURE_KEY = 'consumables';


export interface State extends EntityState<Consumable> {
  selectedConsumable: DetailedConsumable
  loaded: boolean; // has the Consumable list been loaded
  error?: string | null; // last known error (if any)
}

export interface consumablePartialState {
  readonly [CONSUMABLE_FEATURE_KEY]: State;
}

export const consumableAdapter: EntityAdapter<Consumable> = createEntityAdapter<
Consumable
>(
  {
    selectId: (product: Consumable) => product.product.code,
  }
);

export const initialState: State = consumableAdapter.getInitialState({
  // set initial required properties
  selectedConsumable: null,
  loaded: false,
  error: null,
});

const ConsumableReducer = createReducer<State>(
  initialState,
  on( ConsumablesActions.loadConsumablesSuccess,
      (state, action)  => consumableAdapter.setAll(action.consumables,
        {
         ...state,
         loaded: true
        })
  ),
  on( ConsumablesActions.loadConsumableByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedConsumable: action.consumable,
      }
    )
),
  on(ConsumablesActions.addConsumableSuccess,
    (state, action) => consumableAdapter.addOne(action.consumable, state)
  ),
  on(ConsumablesActions.updateConsumableSuccess, (state, action) =>
     consumableAdapter.upsertOne(action.consumable, state)
  ),
  on(ConsumablesActions.removeConsumableSuccess, (state, action) =>
     consumableAdapter.removeOne(action.consumableId, state)
  ),
  on(ProductsActions.removeManyProductsSuccess, (state, action) =>
  consumableAdapter.removeMany(action.codes, state)
  ),
  on(ConsumablesActions.loadConsumablesFailure,
     ConsumablesActions.updateConsumableFailure,
     ConsumablesActions.addConsumableFailure,
     ConsumablesActions.loadConsumableByIdFailure,
     ConsumablesActions.removeConsumableFailure,
     ProductsActions.removeManyProductsFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ConsumableReducer(state, action);
}
