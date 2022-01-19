import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Service } from '@tanglass-erp/core/product';

import { SERVICE_FEATURE_KEY, serviceAdapter, State } from '../reducers/service.reducer';

// Lookup the 'Companies' feature state managed by NgRx
export const getServicesState = createFeatureSelector<
State
>(SERVICE_FEATURE_KEY);

const { selectAll, selectEntities } = serviceAdapter.getSelectors();


export const getServicesLoaded = createSelector(
  getServicesState,
  (state: State) => state.loaded
);

export const getServicesError = createSelector(
  getServicesState,
  (state: State) => state.error
);


export const getAllServices = createSelector(
  getServicesState,
  (state: State) => selectAll(state)
);

export const getServiceEntities = createSelector(
  getServicesState,
  (state: State) => selectEntities(state)
);

export const getSelectedService = createSelector(
  getServicesState,
  (state: State) => state.selectedService
);


/********************************************************************************* */
/****RETURN COMPANIES VIEW MODEL */
/********************************************************************************* */

export interface ServicesViewModel {
  services: Service[],
}

export const selectServicesViewModel = createSelector(
  getAllServices,
  (
    services: Service[]
  ): ServicesViewModel => {
    return {
      services: services,
    };
  }
);
