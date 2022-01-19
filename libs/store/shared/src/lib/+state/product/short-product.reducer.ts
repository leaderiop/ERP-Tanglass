import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ShortProductActions from './short-product.actions';
import { ShortSubstance } from '@tanglass-erp/core/common';

export const SHORT_PRODUCT_FEATURE_KEY = 'shortProduct';

export interface State extends EntityState<ShortSubstance> {
  selectedId?: string | number; // which ShortProduct record has been selected
  loaded: boolean; // has the ShortProduct list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShortProductPartialState {
  readonly [SHORT_PRODUCT_FEATURE_KEY]: State;
}

export const shortProductAdapter: EntityAdapter<ShortSubstance> = createEntityAdapter<
ShortSubstance
>({
  selectId: (product: ShortSubstance) => product.code,
})

export const initialState: State = shortProductAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const shortProductReducer = createReducer(
  initialState,
  on(ShortProductActions.loadShortProduct, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ShortProductActions.loadShortProductSuccess, (state, { shortProduct }) =>
    shortProductAdapter.setAll(shortProduct, { ...state, loaded: true })
  ),
  on(ShortProductActions.loadShortProductFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return shortProductReducer(state, action);
}
