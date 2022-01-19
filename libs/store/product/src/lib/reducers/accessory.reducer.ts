import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as AccessoriesActions from '../actions/accessory.actions';
import { Accessory, DetailedAccessory } from '@tanglass-erp/core/product';
import * as ProductsActions from '../actions/product.actions';

export const ACCESSORY_FEATURE_KEY = 'accessories';


export interface State extends EntityState<Accessory> {
  selectedAccessory: DetailedAccessory
  loaded: boolean; // has the Accessory list been loaded
  error?: string | null; // last known error (if any)
}

export interface accessoryPartialState {
  readonly [ACCESSORY_FEATURE_KEY]: State;
}

export const accessoryAdapter: EntityAdapter<Accessory> = createEntityAdapter<
Accessory
>(
  {
    selectId: (product: Accessory) => product.product.code,
  }
);

export const initialState: State = accessoryAdapter.getInitialState({
  // set initial required properties
  selectedAccessory: null,
  loaded: false,
  error: null,
});

const AccessoryReducer = createReducer<State>(
  initialState,
  on( AccessoriesActions.loadAccessoriesSuccess,
      (state, action)  => accessoryAdapter.setAll(action.accessories,
        {
         ...state,
         loaded: true
        })
  ),
  on( AccessoriesActions.loadAccessoryByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedAccessory: action.accessory,
      }
    )
),
  on(AccessoriesActions.addAccessorySuccess,
    (state, action) => accessoryAdapter.addOne(action.accessory, state)
  ),
  on(AccessoriesActions.updateAccessorySuccess, (state, action) =>
    accessoryAdapter.upsertOne(action.accessory, state)
  ),
  on(AccessoriesActions.removeAccessorySuccess, (state, action) =>
    accessoryAdapter.removeOne(action.accessoryId, state)
  ),
  on(ProductsActions.removeManyProductsSuccess, (state, action) =>
    accessoryAdapter.removeMany(action.codes, state)
  ),
  on(AccessoriesActions.loadAccessoriesFailure,
     AccessoriesActions.updateAccessoryFailure,
     AccessoriesActions.addAccessoryFailure,
     AccessoriesActions.loadAccessoryByIdFailure,
     AccessoriesActions.removeAccessoryFailure,
     ProductsActions.removeManyProductsFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return AccessoryReducer(state, action);
}
