import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ShortCompanyActions from './short-company.actions';
import { ShortFeature } from '@tanglass-erp/core/common';

export const SHORTCOMPANY_FEATURE_KEY = 'shortCompany';

export interface State extends EntityState<ShortFeature> {
  selectedId?: string | number; // which ShortCompany record has been selected
  loaded: boolean; // has the ShortCompany list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShortCompanyPartialState {
  readonly [SHORTCOMPANY_FEATURE_KEY]: State;
}

export const shortCompanyAdapter: EntityAdapter<ShortFeature> = createEntityAdapter<
ShortFeature
>();

export const initialState: State = shortCompanyAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const shortCompanyReducer = createReducer(
  initialState,
  on(ShortCompanyActions.loadShortCompany, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ShortCompanyActions.loadShortCompanySuccess, (state, { shortCompany }) =>
    shortCompanyAdapter.setAll(shortCompany, { ...state, loaded: true })
  ),
  on(ShortCompanyActions.loadShortCompanyFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return shortCompanyReducer(state, action);
}
