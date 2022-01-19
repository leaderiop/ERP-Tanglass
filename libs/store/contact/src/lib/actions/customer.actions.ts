import {
  AffectContactCustomer,
  Customer,
  DeleteAddress,
  DeleteAffectedContact,
  DetailedCustomer,
  InsertAddressContact,
  InsertContact
} from '@tanglass-erp/core/contact';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD CUSTOMERS ** */
/****************************************************************** */

export const loadCustomers= createAction('[Customers Component] Load Customers');


export const loadCustomersSuccess = createAction(
  '[Customer Effect] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customer Effect] Load Customers Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL CUSTOMER ** */
/****************************************************************** */

export const loadCustomerById = createAction(
  '[Customer Card Component] Load Customer By Id',
  props<{ id: any }>()
  );


export const loadCustomerByIdSuccess = createAction(
  '[Customer Effect] Load Customer By Id Success',
  props<{ customer: DetailedCustomer }>()
);

export const loadCustomerByIdFailure = createAction(
  '[Customer Effect] Load Customer By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL CUSTOMER ** */
/****************************************************************** */

export const addCustomer = createAction(
  '[Customers Component] Add Customer',
  props<{ customer: Customer }>()
);

export const addCustomerSuccess = createAction(
  '[Customer Effect] Add Customer Success',
  props<{ customer: Customer }>()
);

export const addCustomerFailure = createAction(
  '[Customer Effect] Add Customer Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL CUSTOMER ** */
/****************************************************************** */

export const updateCustomer = createAction(
  '[Customers Component] Update Customer',
  props<{ customer: DetailedCustomer }>()
);
export const updateCustomerSuccess = createAction(
  '[Customer Effect] Update Customer Success',
  props<{ customer: Customer }>()
);
export const updateCustomerFailure = createAction(
  '[Customer Effect] Update Customer failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL CUSTOMER ** */
/****************************************************************** */

export const removeCustomer = createAction(
  '[Customers Component] Delete Customer',
  props<{ customerId: any }>()
);
export const removeCustomerSuccess = createAction(
  '[Customer Effect] Delete Customer Success',
  props<{ customerId: any }>()
);
export const removeCustomerFailure = createAction(
  '[Customer Effect] Delete Customer failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD ADRESS TO CUSTOMER ** */
/****************************************************************** */

export const addAdressToCustomer = createAction(
  '[Customer card Component] Add Adress To Customer',
  props<{ address: InsertAddressContact }>()
);
export const addAdressToCustomerSuccess = createAction(
  '[Customer Effect] Add Adress To Customer Success',
  props<{ address: any }>()
);
export const addAdressToCustomerFailure = createAction(
  '[Customer Effect] Add Adress To Customer failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD ADRESS TO CUSTOMER ** */
/****************************************************************** */

export const addContactToCustomer = createAction(
  '[Customer card Component] Add Contact To Customer',
  props<{ contact: InsertContact }>()
);
export const addContactToCustomerSuccess = createAction(
  '[Customer Effect] Add Contact To Customer Success',
  props<{ contact: any }>()
);
export const addContactToCustomerFailure = createAction(
  '[Customer Effect] Add Contact To Customer failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****AFFECT ADRESS TO CUSTOMER ** */
/****************************************************************** */

export const affectContactToCustomer = createAction(
  '[Customer card Component] affect Contact To Customer',
  props<{ contact: AffectContactCustomer[] }>()
);
export const affectContactToCustomerSuccess = createAction(
  '[Customer Effect] affect Contact To Customer Success',
  props<{ contact: any }>()
);
export const affectContactToCustomerFailure = createAction(
  '[Customer Effect] affect Contact To Customer failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE ADRESS FROM CUSTOMER ** */
/****************************************************************** */

export const removeAdressFromCustomer = createAction(
  '[Customer card Component] remove Adress from Customer',
  props<{ adress: DeleteAddress }>()
);
export const removeAdressFromCustomerSuccess = createAction(
  '[Customer Effect] remove Adress from Customer Success',
  props<{ adress: any }>()
);
export const removeAdressFromCustomerFailure = createAction(
  '[Customer Effect] remove Adress from Customer failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE CONTACT FROM CUSTOMER ** */
/****************************************************************** */

export const removeContactFromCustomer = createAction(
  '[Customer card Component] remove Contact from Customer',
  props<{ contact: DeleteAffectedContact }>()
);
export const removeContactFromCustomerSuccess = createAction(
  '[Customer Effect] remove Contact from Customer Success',
  props<{ contact: any }>()
);
export const removeContactFromCustomerFailure = createAction(
  '[Customer Effect] remove Contact from Customer failure',
  props<{ error: any }>()
);
