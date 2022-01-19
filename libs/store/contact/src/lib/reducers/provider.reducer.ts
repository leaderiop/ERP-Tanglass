import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ProvidersActions from '../actions/provider.actions';
import { DetailedProvider, Provider } from '@tanglass-erp/core/contact';

export const PROVIDER_FEATURE_KEY = 'Providers';


export interface State extends EntityState<Provider> {
  selectedProvider: DetailedProvider
  loaded: boolean; // has the Provider list been loaded
  error?: string | null; // last known error (if any)
}

export interface providerPartialState {
  readonly [PROVIDER_FEATURE_KEY]: State;
}

export const providerAdapter: EntityAdapter<Provider> = createEntityAdapter<
Provider
>();

export const initialState: State = providerAdapter.getInitialState({
  // set initial required properties
  selectedProvider: null,
  loaded: false,
  error: null,
});

const ProviderReducer = createReducer<State>(
  initialState,
  on( ProvidersActions.loadProvidersSuccess,
      (state, action)  => providerAdapter.setAll(action.providers,
        {
         ...state,
         loaded: true
        })
  ),
  on( ProvidersActions.loadProviderByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedProvider: action.provider,
      }
    )
),
  on( ProvidersActions.loadProviderById,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedProvider: null,
      }
    )
),
on(ProvidersActions.addContactToProviderSuccess, (state, action) =>
     (
       {
         ...state,
         selectedProvider : {
           ...state.selectedProvider,
           contacts : [
             ...state.selectedProvider.contacts,
             action.contact.contact
           ]
         }
       }
     )
  ),
  on(ProvidersActions.addAdressToProviderSuccess, (state, action) =>
     (
       {
         ...state,
         selectedProvider : {
           ...state.selectedProvider,
           addresses : [
             ...state.selectedProvider.addresses,
             action.adress.address
           ]
         }
       }
     )
  ),
  on(ProvidersActions.removeAdressFromProvider, (state, action) =>
     (
       {
         ...state,
         selectedProvider : {
           ...state.selectedProvider,
           addresses : state.selectedProvider.addresses.filter( address => address.id !== action.adress.addressid)
         }
       }
     )
  ),
  on(ProvidersActions.removeContactFromProvider, (state, action) =>
     (
       {
         ...state,
         selectedProvider : {
           ...state.selectedProvider,
           contacts : state.selectedProvider.contacts.filter(contact => contact.id !== action.contact.contactid)
         }
       }
     )
  ),
  on(ProvidersActions.addProviderSuccess,
    (state, action) => providerAdapter.addOne(action.provider, state)
  ),
  on(ProvidersActions.updateProviderSuccess, (state, action) =>
    providerAdapter.upsertOne(action.provider, state)
  ),
  on(ProvidersActions.removeProviderSuccess, (state, action) =>
    providerAdapter.removeOne(action.providerId, state)
  ),
  on(ProvidersActions.loadProvidersFailure,
     ProvidersActions.updateProviderFailure,
     ProvidersActions.addProviderFailure,
     ProvidersActions.loadProviderByIdFailure,
     ProvidersActions.removeProviderFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ProviderReducer(state, action);
}
