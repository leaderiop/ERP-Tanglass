import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServiceConfig } from '@tanglass-erp/core/product';

import { SERVICE_CONFIG_FEATURE_KEY, serviceConfigAdapter, State } from '../reducers/servicesConfig.reducer';

// Lookup the 'SERVICE GROUPES' feature state managed by NgRx
export const getServiceConfigsState = createFeatureSelector<
State
>(SERVICE_CONFIG_FEATURE_KEY);

const { selectAll, selectEntities } = serviceConfigAdapter.getSelectors();


export const getServiceConfigsLoaded = createSelector(
  getServiceConfigsState,
  (state: State) => state.loaded
);

export const getServiceConfigsError = createSelector(
  getServiceConfigsState,
  (state: State) => state.error
);


export const getAllServiceConfigs = createSelector(
  getServiceConfigsState,
  (state: State) => selectAll(state)
);

export const getServiceConfigEntities = createSelector(
  getServiceConfigsState,
  (state: State) => selectEntities(state)
);

export const getSelectedServiceConfig = createSelector(
  getServiceConfigsState,
  (state: State) => state.selectedServiceConfig
);

export const getServicesOfSelectedServiceConfig = createSelector(
  getServiceConfigsState,
  (state: State) => state.selectedServiceConfig.services
);


/********************************************************************************* */
/****RETURN SERVICE GROUPE VIEW MODEL */
/********************************************************************************* */

export interface ServiceConfigsViewModel {
  serviceConfigs: ServiceConfig[],
}

export const selectServiceConfigsViewModel = createSelector(
  getAllServiceConfigs,
  (
    serviceConfigs: ServiceConfig[]
  ): ServiceConfigsViewModel => {
    return {
        serviceConfigs: serviceConfigs,
    };
  }
);
