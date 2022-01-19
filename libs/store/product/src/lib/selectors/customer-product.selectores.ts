import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerProduct } from '@tanglass-erp/core/product';

import { CUSTOMER_PRODUCT_FEATURE_KEY, customerProductAdapter, State } from '../reducers/customer-product.reducer';

// Lookup the 'CustomerProducts' feature state managed by NgRx
export const getCustomerProductsState = createFeatureSelector<
State
>(CUSTOMER_PRODUCT_FEATURE_KEY);

const { selectAll, selectEntities } = customerProductAdapter.getSelectors();


export const getCustomerProductsLoaded = createSelector(
  getCustomerProductsState,
  (state: State) => state.loaded
);

export const getCustomerProductsError = createSelector(
  getCustomerProductsState,
  (state: State) => state.error
);


export const getAllCustomerProducts = createSelector(
  getCustomerProductsState,
  (state: State) => selectAll(state)
);

export const getCustomerProductEntities = createSelector(
  getCustomerProductsState,
  (state: State) => selectEntities(state)
);

export const getSelectedCustomerProduct = createSelector(
  getCustomerProductsState,
  (state: State) => state.selectedCustomerProduct
);


/********************************************************************************* */
/****RETURN CustomerProducts VIEW MODEL */
/********************************************************************************* */

export interface CustomerProductsViewModel {
  CustomerProducts: CustomerProduct[],
}

export const selectCustomerProductsViewModel = createSelector(
  getAllCustomerProducts,
  (
    CustomerProducts: CustomerProduct[]
  ): CustomerProductsViewModel => {
    return {
      CustomerProducts: CustomerProducts,
    };
  }
);
