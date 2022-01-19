import { CustomerProduct } from '@tanglass-erp/core/product';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD Customer Product ** */
/****************************************************************** */

export const loadCustomerProducts= createAction('[List Customer Products Component] Load Customer Product');


export const loadCustomerProductsSuccess = createAction(
  '[Customer Product Effect] Load Customer Products Success',
  props<{ customerProduct: CustomerProduct[] }>()
);

export const loadCustomerProductsFailure = createAction(
  '[Customer Product Effect] Load Customer Products Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL Customer Product ** */
/****************************************************************** */

export const loadCustomerProductById = createAction(
  '[Customer Product Card Component] Load Customer Product By Id',
  props<{ id: any }>()
  );


export const loadCustomerProductByIdSuccess = createAction(
  '[Customer Product Effect] Load Customer Product By Id Success',
  props<{ customerProduct: CustomerProduct  }>()
);

export const loadCustomerProductByIdFailure = createAction(
  '[Customer Product Effect] Load Customer Product By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL Customer Product ** */
/****************************************************************** */

export const addCustomerProduct = createAction(
  '[List Customer Product Component] Add Customer Product',
  props<{ customerProduct: CustomerProduct }>()
);

export const addCustomerProductSuccess = createAction(
  '[Customer Product Effect] Add Customer Product Success',
  props<{ customerProduct: CustomerProduct }>()
);

export const addCustomerProductFailure = createAction(
  '[Customer Product Effect] Add Customer Product Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Customer Product ** */
/****************************************************************** */

export const updateCustomerProduct = createAction(
  '[List Customer Products Component] Update Customer Product',
  props<{ customerProduct: CustomerProduct }>()
);
export const updateCustomerProductuccess = createAction(
  '[Customer Product Effect] Update Customer Product Success',
  props<{ customerProduct: CustomerProduct }>()
);
export const updateCustomerProductFailure = createAction(
  '[Customer Product Effect] Update Customer Product failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL Customer Product ** */
/****************************************************************** */

export const removeCustomerProduct = createAction(
  '[List Customer Products Component] Delete Customer Product',
  props<{ customerProductId: any }>()
);
export const removeCustomerProductuccess = createAction(
  '[Customer Product Effect] Delete Customer Product Success',
  props<{ customerProductId: any }>()
);
export const removeCustomerProductFailure = createAction(
  '[Customer Product Effect] Delete Customer Product failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE MANY Customers Items ** */
/****************************************************************** */

export const removeCustomerItems = createAction(
  '[List CustomerItems ] Delete CustomerItems',
  props<{ ids: string[] }>()
);
export const removeCustomerItemsSuccess = createAction(
  '[CustomerItems ] Delete CustomerItems Success',
  props<{ ids:  string[] }>()
);
export const removeCustomerItemsFailure = createAction(
  '[CustomerItems ] Delete CustomerItems failure',
  props<{ error: any }>()
);







