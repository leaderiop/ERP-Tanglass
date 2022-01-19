import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CustomersActions from '../actions/customer.actions';
import { Customer, DetailedCustomer } from '@tanglass-erp/core/contact';

export const CUSTOMER_FEATURE_KEY = 'customers';


export interface State extends EntityState<Customer> {
  selectedCustomer: DetailedCustomer
  loaded: boolean; // has the Customer list been loaded
  error?: string | null; // last known error (if any)
}

export interface CustomerPartialState {
  readonly [CUSTOMER_FEATURE_KEY]: State;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<
Customer
>();

export const initialState: State = customerAdapter.getInitialState({
  // set initial required properties
  selectedCustomer: null,
  loaded: false,
  error: null,
});

const CustomerReducer = createReducer<State>(
  initialState,
  on( CustomersActions.loadCustomersSuccess,
      (state, action)  => customerAdapter.setAll(action.customers,
        {
         ...state,
         loaded: true
        })
  ),
  on( CustomersActions.loadCustomerByIdSuccess,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedCustomer: action.customer,
      }
    )
),
  on( CustomersActions.loadCustomerById,
    (state, action)  => (
      {
        ...state,
        error: null,
        selectedCustomer: null,
      }
    )
),
  on(CustomersActions.addCustomerSuccess,
    (state, action) => customerAdapter.addOne(action.customer, state)
  ),
  on(CustomersActions.updateCustomerSuccess, (state, action) =>
     customerAdapter.upsertOne(action.customer, state)
  ),
  on(CustomersActions.addContactToCustomerSuccess, (state, action) =>
     (
       {
         ...state,
         selectedCustomer : {
           ...state.selectedCustomer,
           contacts : [
             ...state.selectedCustomer.contacts,
             action.contact.contact
           ]
         }
       }
     )
  ),
  on(CustomersActions.addAdressToCustomerSuccess, (state, action) =>
     (
       {
         ...state,
         selectedCustomer : {
           ...state.selectedCustomer,
           addresses : [
             ...state.selectedCustomer.addresses,
             action.address.address
           ]
         }
       }
     )
  ),
  on(CustomersActions.removeAdressFromCustomer, (state, action) =>
     (
       {
         ...state,
         selectedCustomer : {
           ...state.selectedCustomer,
           addresses : state.selectedCustomer.addresses.filter( address => address.id !== action.adress.addressid)
         }
       }
     )
  ),
  on(CustomersActions.removeContactFromCustomer, (state, action) =>
     (
       {
         ...state,
         selectedCustomer : {
           ...state.selectedCustomer,
           contacts : state.selectedCustomer.contacts.filter(contact => contact.id !== action.contact.contactid)
         }
       }
     )
  ),
  on(CustomersActions.removeCustomerSuccess, (state, action) =>
     customerAdapter.removeOne(action.customerId, state)
  ),
  on(CustomersActions.loadCustomersFailure,
     CustomersActions.addAdressToCustomerFailure,
     CustomersActions.removeAdressFromCustomerFailure,
     CustomersActions.addContactToCustomerFailure,
     CustomersActions.updateCustomerFailure,
     CustomersActions.addCustomerFailure,
     CustomersActions.loadCustomerByIdFailure,
     CustomersActions.removeCustomerFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return CustomerReducer(state, action);
}
