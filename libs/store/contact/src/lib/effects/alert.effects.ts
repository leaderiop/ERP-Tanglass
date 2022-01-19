import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromContactActions from '../actions/contact.actions';
import * as fromCustomerActions from '../actions/customer.actions';
import * as fromProviderActions from '../actions/provider.actions';
import { ToastrService } from 'ngx-toastr';

const OPTIONS = {
  positionClass : 'toast-bottom-center',
  closeButton: true,
  disableTimeOut: true
 }

@Injectable()
export class contactAlertEffects {

  unableToLoadContacts$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromContactActions.loadContactsFailure),
      tap((action) => this.toastr.error( action.error, 'Load contacts failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadCustomers$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromCustomerActions.loadCustomersFailure),
      tap( (action) => this.toastr.error(action.error, 'Load customers failed', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToLoadProviders$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromProviderActions.loadProvidersFailure),
      tap( (action) => this.toastr.error(action.error, 'Load providers failed', OPTIONS))
    )
  )

  unableToLoadContactById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromContactActions.loadContactByIdFailure),
      tap((action) => this.toastr.error( action.error, 'Load contact by id failed', OPTIONS))
    ),
    {dispatch: false}

  )

  contactCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromContactActions.addContactSuccess),
        tap( (action) =>this.toastr.success( 'The contact: ' + action.contact.name + ' has been created', 'Creation succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  customerCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCustomerActions.addCustomerSuccess),
        tap( (action) => this.toastr.success('The customer: ' + action.customer.name + ' has been created', 'Creation succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  providerCreated$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromProviderActions.addProviderSuccess),
      tap( (action) => this.toastr.success('The provider: ' + action.provider.name + ' has been created', 'Creation succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToCreateContact$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromContactActions.addContactFailure),
        tap((action) => this.toastr.error( action.error,'Contact creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToCreateProvider$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromProviderActions.addProviderFailure),
        tap((action) => this.toastr.error( action.error, 'Provider creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToCreateCustomer$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCustomerActions.addCustomerFailure),
        tap((action) => this.toastr.error( action.error, 'Customer creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  contactUpdated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromContactActions.updateContactSuccess),
        tap( (action) =>this.toastr.success( 'The contact: ' + action.contact.name + ' has been updated', 'Update succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  customerUpdated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCustomerActions.updateCustomerSuccess),
        tap( (action) => this.toastr.success('The customer: ' + action.customer.name + ' has been updated', 'Update succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  providerUpdated$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromProviderActions.updateProviderSuccess),
      tap( (action) => this.toastr.success('The user: ' + action.provider.name + ' has been updated', 'Update succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToUpdateContact$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromContactActions.updateContactFailure),
        tap((action) => this.toastr.error( action.error,'Contact update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToUpdateProvider$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromProviderActions.updateProviderFailure),
        tap((action) => this.toastr.error( action.error,'Provider update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToUpdateCustomer$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCustomerActions.updateCustomerFailure),
        tap((action) => this.toastr.error( action.error,'Customer update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  contactDeleted$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromContactActions.removeContactSuccess),
        tap( () =>this.toastr.success( 'The contact has been successfully deleted', 'Delete succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  customerDeleted$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCustomerActions.removeCustomerSuccess),
        tap( () => this.toastr.success('The customer successfully deleted', 'Delete succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  providerDeleted$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromProviderActions.removeProviderSuccess),
      tap( () => this.toastr.success('The users uccessfully deleted', 'Delete succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToDeleteContact$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromContactActions.removeContactFailure),
        tap((action) => this.toastr.error( action.error,'Contact delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToDeleteProvider$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromProviderActions.removeProviderFailure),
        tap((action) => this.toastr.error( action.error,'Provider delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToDeleteCustomer$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCustomerActions.removeCustomerFailure),
        tap((action) => this.toastr.error( action.error,'Customer delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  constructor( private actions: Actions, private toastr: ToastrService) {

  }

}
