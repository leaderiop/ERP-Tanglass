import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ServicesActions from '../actions/service.actions';
import { DetailedService, Service } from '@tanglass-erp/core/product';

export const SERVICE_FEATURE_KEY = 'services';


export interface State extends EntityState<Service> {
  selectedService: DetailedService
  loaded: boolean; // has the Service list been loaded
  error?: string | null; // last known error (if any)
}

export interface servicePartialState {
  readonly [SERVICE_FEATURE_KEY]: State;
}

export const serviceAdapter: EntityAdapter<Service> = createEntityAdapter<
Service
>({
  selectId: (product: Service) => product.product.code,
});

export const initialState: State = serviceAdapter.getInitialState({
  // set initial required properties
  selectedService: null,
  loaded: false,
  error: null,
});

const ServiceReducer = createReducer<State>(
  initialState,
  on( ServicesActions.loadServicesSuccess,
      (state, action)  => serviceAdapter.setAll(action.services,
        {
         ...state,
         loaded: true
        })
  ),
  on( ServicesActions.loadServiceByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedService: action.service,
      }
    )
),
  on(ServicesActions.addServiceSuccess,
    (state, action) => serviceAdapter.addOne(action.service, state)
  ),
  on(ServicesActions.updateServiceSuccess, (state, action) =>
     serviceAdapter.upsertOne({id: "sasasa",}, state)
  ),
  on(ServicesActions.removeServiceSuccess, (state, action) =>
     serviceAdapter.removeOne(action.service.id, state)
  ),
  on(ServicesActions.loadServicesFailure,
     ServicesActions.updateServiceFailure,
     ServicesActions.addServiceFailure,
     ServicesActions.loadServiceByIdFailure,
     ServicesActions.removeServiceFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ServiceReducer(state, action);
}
