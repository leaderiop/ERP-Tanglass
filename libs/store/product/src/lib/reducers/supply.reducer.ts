import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as SuppliesActions from '../actions/supply.actions';

export const SUPPLY_FEATURE_KEY = 'supplies';


export interface State extends EntityState<any> {
  selectedSupply: any
  loaded: boolean; // has the Supply list been loaded
  error?: string | null; // last known error (if any)
}

export interface supplyPartialState {
  readonly [SUPPLY_FEATURE_KEY]: State;
}

export const supplyAdapter: EntityAdapter<any> = createEntityAdapter<
any
>();

export const initialState: State = supplyAdapter.getInitialState({
  // set initial required properties
  selectedSupply: null,
  loaded: false,
  error: null,
});

const SupplyReducer = createReducer<State>(
  initialState,
  on( SuppliesActions.loadSuppliesSuccess,
      (state, action)  => supplyAdapter.setAll(action.supplies,
        {
         ...state,
         loaded: true
        })
  ),
  on( SuppliesActions.loadSupplyByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedSupply: action.supply,
      }
    )
),
  on(SuppliesActions.addSupplySuccess,
    (state, action) => supplyAdapter.addOne(action.supply, state)
  ),
  on(SuppliesActions.updateSupplySuccess, (state, action) =>
    supplyAdapter.upsertOne(action.supply, state)
  ),
  on(SuppliesActions.removeSupplySuccess, (state, action) =>
    supplyAdapter.removeOne(action.supplyId, state)
  ),
  on(SuppliesActions.loadSuppliesFailure,
     SuppliesActions.updateSupplyFailure,
     SuppliesActions.addSupplyFailure,
     SuppliesActions.loadSupplyByIdFailure,
     SuppliesActions.removeSupplyFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return SupplyReducer(state, action);
}
