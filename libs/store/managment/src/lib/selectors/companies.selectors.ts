import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Companie } from '@tanglass-erp/core/management';

import { COMPANIE_FEATURE_KEY, companieAdapter, State } from '../reducers/companies.reducer';

// Lookup the 'Companies' feature state managed by NgRx
export const getCompaniesState = createFeatureSelector<
State
>(COMPANIE_FEATURE_KEY);

const { selectAll, selectEntities } = companieAdapter.getSelectors();


export const getCompaniesLoaded = createSelector(
  getCompaniesState,
  (state: State) => state.loaded
);

export const getCompaniesError = createSelector(
  getCompaniesState,
  (state: State) => state.error
);


export const getAllCompanies = createSelector(
  getCompaniesState,
  (state: State) => selectAll(state)
);

export const getCompanieEntities = createSelector(
  getCompaniesState,
  (state: State) => selectEntities(state)
);

export const getSelectedCompanie = createSelector(
  getCompaniesState,
  (state: State) => state.selectedCompanie
);


/********************************************************************************* */
/****RETURN COMPANIES VIEW MODEL */
/********************************************************************************* */

export interface CompaniesViewModel {
  companies: Companie[],
}

export const selectCompaniesViewModel = createSelector(
  getAllCompanies,
  (
    companies: Companie[]
  ): CompaniesViewModel => {
    return {
      companies: companies,
    };
  }
);
