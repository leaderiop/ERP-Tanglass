import { CustomerService } from '@tanglass-erp/core/contact';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as CustomersActions from '../actions/customer.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CustomersEffects {

  loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.loadCustomers),
      mergeMap( () =>
        this.customerService.getAll().pipe(
          map((data) =>
          CustomersActions.loadCustomersSuccess({customers: data.data.contact_customer})
          ),
          catchError((error) =>
            of(CustomersActions.loadCustomersFailure({ error }))
          )
        )
      )
    )
  });

  loadCustomerById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.loadCustomerById),
      mergeMap( (action) =>
        this.customerService.getOneById(action.id).pipe(
          map((data) =>
          CustomersActions.loadCustomerByIdSuccess({customer: data.data.contact_customer_by_pk})
          ),
          catchError((error) =>
            of(CustomersActions.loadCustomerByIdFailure({ error }))
          )
        )
      )
    )
  });

  insertCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.addCustomer),
      mergeMap((action) =>
        this.customerService.insertOne(action.customer).pipe(
          map((data) =>
          CustomersActions.addCustomerSuccess({customer: data.data.insert_contact_customer_one})
          ),
          catchError((error) =>
            of(CustomersActions.addCustomerFailure({ error }))
          )
        )
      )
    )
  });



  updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.updateCustomer),
      mergeMap((action) =>
        this.customerService.updateOne(action.customer).pipe(
          map((data) =>
          CustomersActions.updateCustomerSuccess({customer: data.data.update_contact_customer_by_pk})
          ),
          catchError((error) =>
            of(CustomersActions.updateCustomerFailure({ error }))
          )
        )
      )
    )
  });

  removeCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.removeCustomer),
      mergeMap((action) =>
        this.customerService.removeOne(action.customerId).pipe(
          map((data) =>
          CustomersActions.removeCustomerSuccess({customerId: data.data.delete_contact_customer_by_pk.id})
          ),
          catchError((error) =>
            of(CustomersActions.removeCustomerFailure({ error }))
          )
        )
      )
    )
  });

  addContactToCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.addContactToCustomer),
      mergeMap((action) =>
        this.customerService.addContact(action.contact).pipe(
          map((data) =>
          CustomersActions.addContactToCustomerSuccess({contact: data.data.insert_contact_customer_contact_one})
          ),
          catchError((error) =>
            of(CustomersActions.addContactToCustomerFailure({ error }))
          )
        )
      )
    )
  });


  affectContactToCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.affectContactToCustomer),
      mergeMap((action) =>
        this.customerService.affectContact(action.contact).pipe(
          map((data) =>
          CustomersActions.affectContactToCustomerSuccess({contact: data.data.insert_contact_customer_contact})
          ),
          catchError((error) =>
            of(CustomersActions.affectContactToCustomerFailure({ error }))
          )
        )
      )
    )
  });

  addAdressToCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.addAdressToCustomer),
      mergeMap((action) =>
        this.customerService.addAddress(action.address).pipe(
          map((data) =>
          CustomersActions.addAdressToCustomerSuccess({address: data.data.insert_contact_customer_address_one})
          ),
          catchError((error) =>
            of(CustomersActions.addAdressToCustomerFailure({ error }))
          )
        )
      )
    )
  });

  removeAdressToCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.removeAdressFromCustomer),
      mergeMap((action) =>
        this.customerService.deleteAddress(action.adress).pipe(
          map((data) =>
          CustomersActions.removeAdressFromCustomerSuccess({adress: data.data.delete_contact_customer_address_by_pk})
          ),
          catchError((error) =>
            of(CustomersActions.removeAdressFromCustomerFailure({ error }))
          )
        )
      )
    )
  });

  removeContactFromCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomersActions.removeContactFromCustomer),
      mergeMap((action) =>
        this.customerService.deleteContact(action.contact).pipe(
          map((data) =>
          CustomersActions.removeContactFromCustomerSuccess({contact: data.data.delete_contact_customer_contact_by_pk})
          ),
          catchError((error) =>
            of(CustomersActions.removeContactFromCustomerFailure({ error }))
          )
        )
      )
    )
  });


  constructor(private actions$: Actions,
              private customerService: CustomerService) {}
}
