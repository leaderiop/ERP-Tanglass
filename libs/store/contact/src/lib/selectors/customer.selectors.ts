import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CUSTOMER_FEATURE_KEY, customerAdapter, State } from '../reducers/customer.reducer';

// Lookup the 'Customers' feature state managed by NgRx
export const getCustomersState = createFeatureSelector<
State
>(CUSTOMER_FEATURE_KEY);

const { selectAll, selectEntities } = customerAdapter.getSelectors();


export const getCustomersLoaded = createSelector(
  getCustomersState,
  (state: State) => state.loaded
);

export const getCustomersError = createSelector(
  getCustomersState,
  (state: State) => state.error
);


export const getAllCustomers = createSelector(
  getCustomersState,
  (state: State) => selectAll(state)
);

export const getCustomerEntities = createSelector(
  getCustomersState,
  (state: State) => selectEntities(state)
);

export const getSelectedCustomer = createSelector(
  getCustomersState,
  (state: State) => state.selectedCustomer
);
