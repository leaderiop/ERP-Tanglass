import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromCompaniesActions from '../actions/companies.actions';
import * as fromSalepointActions from '../actions/salePoint.actions';
import * as fromUserActions from '../actions/user.actions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AddNotification, AppState } from '@tanglass-erp/store/app';


const OPTIONS = {
  positionClass : 'toast-bottom-center',
  closeButton: true,
  disableTimeOut: true
 }

@Injectable()
export class AlertEffects {

  unableToLoadCompanies$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromCompaniesActions.loadCompaniesFailure),
      tap((action) => this.toastr.error( action.error, 'Load companies failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadSalePoints$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromSalepointActions.loadSalePointsFailure),
      tap( (action) => this.toastr.error(action.error, 'Load sale-points failed', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToLoadUsers$ =createEffect(
    () =>
    this.actions.pipe(
      ofType(fromUserActions.loadUsersFailure),
      tap( (action) => this.toastr.error(action.error, 'Load users failed', OPTIONS))
    )
  )

  unableToLoadCompaniesById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromCompaniesActions.loadCompanieByIdFailure),
      tap((action) => this.toastr.error( action.error, 'Load companie by id failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadSalePointsById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromSalepointActions.loadSalePointsFailure),
      tap( (action) => this.toastr.error(action.error, 'Load sale-point by id failed', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToLoadUsersById$ =createEffect(
    () =>
    this.actions.pipe(
      ofType(fromUserActions.loadUsersFailure),
      tap( (action) => this.toastr.error(action.error, 'Load user by id failed', OPTIONS))
    )
  )

  companieCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCompaniesActions.addCompanieSuccess),
        tap( (action) => {
          this.store.dispatch(AddNotification({notification: {
            message: 'The companie: ' + action.companie.name + ' has been created',
            color : 'primary',
            icon : 'assignment_ind',
          }}));
          return this.toastr.success( 'The companie: ' + action.companie.name + ' has been created', 'Creation succeded', OPTIONS)
        } )
      ),
      {dispatch: false}

  )

  salePointCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromSalepointActions.addSalePointSuccess),
        tap( (action) => this.toastr.success('The sale-point: ' + action.salePoint.name + ' has been created', 'Creation succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  userCreated$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromUserActions.addUserSuccess),
      tap( (action) => this.toastr.success('The user: ' + action.user.lastname + ' ' + action.user.firstname +' has been created', 'Creation succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToCreateCompanie$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCompaniesActions.addCompanieFailure),
        tap((action) => this.toastr.error( action.error,'Companie creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToCreateUser$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromUserActions.addUserFailure),
        tap((action) => this.toastr.error( action.error,'User creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToCreateSalePoint$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromSalepointActions.addSalePointFailure),
        tap((action) => this.toastr.error( action.error,'SalePoint creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  companieUpdated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCompaniesActions.updateCompanieSuccess),
        tap( (action) =>this.toastr.success( 'The companie: ' + action.companie.name + ' has been updated', 'Update succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  salePointUpdated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromSalepointActions.updateSalePointSuccess),
        tap( (action) => this.toastr.success('The sale-point: ' + action.salePoint.name + ' has been updated', 'Update succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  userUpdated$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromUserActions.updateUserSuccess),
      tap( (action) => this.toastr.success('The user: ' + action.user.lastname + ' ' + action.user.firstname +' has been updated', 'Update succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToUpdateCompanie$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCompaniesActions.updateCompanieFailure),
        tap((action) => this.toastr.error( action.error,'Companie update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToUpdateUser$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromUserActions.updateUserFailure),
        tap((action) => this.toastr.error( action.error,'User update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToUpdateSalePoint$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromSalepointActions.updateSalePointFailure),
        tap((action) => this.toastr.error( action.error,'SalePoint update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  companieDeleted$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCompaniesActions.removeCompanieSuccess),
        tap( () =>this.toastr.success( 'The companie has been succesfully deleted', 'Delete succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  salePointDeleted = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromSalepointActions.removeSalePointSuccess),
        tap( () => this.toastr.success('The sale-point has been succesfully deleted', 'Delete succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  userDeleted$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromUserActions.removeUserSuccess),
      tap( () => this.toastr.success('The user has been succesfully deleted', 'Delete succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToDeleteCompanie$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromCompaniesActions.removeCompanieFailure),
        tap((action) => this.toastr.error( action.error,'Companie delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToDeleteUser$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromUserActions.removeUserFailure),
        tap((action) => this.toastr.error( action.error,'User delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToDeleteSalePoint$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromSalepointActions.removeSalePointFailure),
        tap((action) => this.toastr.error( action.error,'SalePoint delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  constructor( private actions: Actions, private toastr: ToastrService, private store: Store<AppState>) {

  }

}
