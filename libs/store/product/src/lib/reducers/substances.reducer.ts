import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as SubstancesActions from '../actions/substances.actions';
import { Substance } from '@tanglass-erp/core/product';

export const SUBSTANCES_FEATURE_KEY = 'substances';

export interface State extends EntityState<Substance> {
  selectedId?: string | number; // which Substances record has been selected
  loaded: boolean; // has the Substances list been loaded
  error?: string | null; // last known error (if any)
}

export interface SubstancesPartialState {
  readonly [SUBSTANCES_FEATURE_KEY]: State;
}

export const substancesAdapter: EntityAdapter<Substance> = createEntityAdapter<
  Substance
>();

export const initialState: State = substancesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const substancesReducer = createReducer(
  initialState,
  on(SubstancesActions.loadSubstances, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SubstancesActions.loadSubstancesSuccess, (state, { substances }) =>
    substancesAdapter.setAll(substances, { ...state, loaded: true })
  ),
  on(SubstancesActions.loadSubstancesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return substancesReducer(state, action);
}
