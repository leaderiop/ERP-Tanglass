import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ServiceConfigActions from '../actions/servicesConfig.actions';
import { DetailedServiceConfig, ServiceConfig } from '@tanglass-erp/core/product';

export const SERVICE_CONFIG_FEATURE_KEY = 'serviceGroup';


export interface State extends EntityState<ServiceConfig> {
  selectedServiceConfig: DetailedServiceConfig
  loaded: boolean; // has the Service list been loaded
  error?: string | null; // last known error (if any)
}

export interface servicePartialState {
  readonly [SERVICE_CONFIG_FEATURE_KEY]: State;
}

export const serviceConfigAdapter: EntityAdapter<ServiceConfig> = createEntityAdapter<
ServiceConfig
>();

export const initialState: State = serviceConfigAdapter.getInitialState({
  // set initial required properties
  selectedServiceConfig: null,
  loaded: false,
  error: null,
});

const ServiceReducer = createReducer<State>(
  initialState,
  on( ServiceConfigActions.loadServiceConfigsSuccess,
      (state, action)  => serviceConfigAdapter.setAll(action.serviceConfigs,
        {
         ...state,
         loaded: true
        })
  ),
  on( ServiceConfigActions.loadServiceConfigByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedServiceConfig: action.serviceConfig,
      }
    )
),
  on(ServiceConfigActions.addServiceConfigSuccess,
    (state, action) => serviceConfigAdapter.addOne(action.serviceConfig, state)
  ),
  on(ServiceConfigActions.updateServiceConfigSuccess, (state, action) =>
  serviceConfigAdapter.upsertOne(action.serviceConfig, state)
  ),
  on(ServiceConfigActions.removeServiceConfigSuccess, (state, action) =>
  serviceConfigAdapter.removeOne(action.serviceConfigId, state)
  ),
  on(ServiceConfigActions.addNewItemSuccess, (state, action) => (
    {
      ...state,
      selectedServiceConfig : {
        ...state.selectedServiceConfig,
        services : [
          ...state.selectedServiceConfig.services,
          action.service
        ]
      }
    }
  )
  ),
  on(ServiceConfigActions.removeManyServices, (state, action) =>
  serviceConfigAdapter.removeMany(action.ids, state)
  ),
  on(ServiceConfigActions.loadServiceConfigByIdFailure,
     ServiceConfigActions.loadServiceConfigsFailure,
     ServiceConfigActions.removeServiceConfigFailure,
     ServiceConfigActions.updateServiceConfigFailure,
     ServiceConfigActions.addServiceConfigFailure,
     ServiceConfigActions.removeManyServicesFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ServiceReducer(state, action);
}
