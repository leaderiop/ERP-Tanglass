import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CompaniesActions from '../actions/companies.actions';
import { Companie, DetailedCompanie } from '@tanglass-erp/core/management';

export const COMPANIE_FEATURE_KEY = 'companies';


export interface State extends EntityState<Companie> {
  selectedCompanie: DetailedCompanie
  loaded: boolean; // has the Companie list been loaded
  error?: string | null; // last known error (if any)
}

export interface CompaniePartialState {
  readonly [COMPANIE_FEATURE_KEY]: State;
}

export const companieAdapter: EntityAdapter<Companie> = createEntityAdapter<
Companie
>();

export const initialState: State = companieAdapter.getInitialState({
  // set initial required properties
  selectedCompanie: null,
  loaded: false,
  error: null,
});

const companieReducer = createReducer<State>(
  initialState,
  on( CompaniesActions.loadCompaniesSuccess,
      (state, action)  => companieAdapter.setAll(action.companies,
        {
         ...state,
         loaded: true
        })
  ),
  on( CompaniesActions.loadCompanieByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedCompanie: action.companie,
      }
    )
),
  on(CompaniesActions.loadCompanieById,
    (state, action) =>
      ({
      ...state,
      selectedCompanie: null
    })
  ),
  on(CompaniesActions.addCompanieSuccess,
    (state, action) => companieAdapter.addOne(action.companie, state)
  ),
  on(CompaniesActions.updateCompanieSuccess, (state, action) =>
     companieAdapter.upsertOne(action.companie, state)
  ),
  on(CompaniesActions.removeCompanieSuccess, (state, action) =>
     companieAdapter.removeOne(action.companieId, state)
  ),
  on(CompaniesActions.loadCompaniesFailure,
     CompaniesActions.updateCompanieFailure,
     CompaniesActions.addCompanieFailure,
     CompaniesActions.loadCompanieByIdFailure,
     CompaniesActions.removeCompanieFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return companieReducer(state, action);
}
