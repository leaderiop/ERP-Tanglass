import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ShortProviderActions from './short-provider.actions';
import { ShortProvider } from '@tanglass-erp/core/common';

export const SHORT_PROVIDER_FEATURE_KEY = 'shortProvider';

export interface State extends EntityState<ShortProvider> {
  selectedId?: string | number; // which ShortProvider record has been selected
  loaded: boolean; // has the ShortProvider list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShortProviderPartialState {
  readonly [SHORT_PROVIDER_FEATURE_KEY]: State;
}

export const shortProviderAdapter: EntityAdapter<ShortProvider> = createEntityAdapter<
ShortProvider
>({
  selectId: (provider: ShortProvider) => provider.code,

});

export const initialState: State = shortProviderAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const shortProviderReducer = createReducer(
  initialState,
  on(ShortProviderActions.loadShortProvider, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    ShortProviderActions.loadShortProviderSuccess,
    (state, { shortProvider }) =>
      shortProviderAdapter.setAll(shortProvider, { ...state, loaded: true })
  ),
  on(ShortProviderActions.loadShortProviderFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return shortProviderReducer(state, action);
}
