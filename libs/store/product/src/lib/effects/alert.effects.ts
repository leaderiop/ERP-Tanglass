import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAccessoriesActions from '../actions/accessory.actions';
import * as fromConsumableActions from '../actions/consumable.actions';
import * as fromGlassActions from '../actions/glass.actions';
import { ToastrService } from 'ngx-toastr';

const OPTIONS = {
  positionClass : 'toast-bottom-center',
  closeButton: true,
  disableTimeOut: true
 }

@Injectable()
export class AlertEffects {

  unableToLoadAccessories$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromAccessoriesActions.loadAccessoriesFailure),
      tap((action) => this.toastr.error( action.error, 'Load Accessories failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadConsumables$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromConsumableActions.loadConsumablesFailure),
      tap( (action) => this.toastr.error(action.error, 'Load sale-points failed', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToLoadGlasss$ =createEffect(
    () =>
    this.actions.pipe(
      ofType(fromGlassActions.loadGlassesFailure),
      tap( (action) => this.toastr.error(action.error, 'Load Glasss failed', OPTIONS))
    )
  )

  unableToLoadAccessoriesById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromAccessoriesActions.loadAccessoryByIdFailure),
      tap((action) => this.toastr.error( action.error, 'Load Accessory by id failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadConsumablesById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromConsumableActions.loadConsumablesFailure),
      tap( (action) => this.toastr.error(action.error, 'Load consumable by id failed', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToLoadGlasssById$ =createEffect(
    () =>
    this.actions.pipe(
      ofType(fromGlassActions.loadGlassesFailure),
      tap( (action) => this.toastr.error(action.error, 'Load Glass by id failed', OPTIONS))
    )
  )

  AccessoryCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccessoriesActions.addAccessorySuccess),
        tap( () =>this.toastr.success( 'The Accessory has been created', 'Creation succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  ConsumableCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromConsumableActions.addConsumableSuccess),
        tap( (action) => this.toastr.success('The consumable has been created', 'Creation succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  GlassCreated$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromGlassActions.addGlassSuccess),
      tap( () => this.toastr.success('The Glass has been created', 'Creation succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToCreateAccessory$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccessoriesActions.addAccessoryFailure),
        tap((action) => this.toastr.error( action.error,'Accessory creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToCreateGlass$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromGlassActions.addGlassFailure),
        tap((action) => this.toastr.error( action.error,'Glass creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToCreateConsumable$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromConsumableActions.addConsumableFailure),
        tap((action) => this.toastr.error( action.error,'Consumable creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  AccessoryUpdated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccessoriesActions.updateAccessorySuccess),
        tap( () =>this.toastr.success( 'The Accessory has been updated', 'Update succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  ConsumableUpdated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromConsumableActions.updateConsumableSuccess),
        tap( () => this.toastr.success('The Consumable has been updated', 'Update succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  GlassUpdated$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromGlassActions.updateGlassesuccess),
      tap( (action) => this.toastr.success('The Glass has been updated', 'Update succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToUpdateAccessory$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccessoriesActions.updateAccessoryFailure),
        tap((action) => this.toastr.error( action.error,'Accessory update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToUpdateGlass$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromGlassActions.updateGlassFailure),
        tap((action) => this.toastr.error( action.error,'Glass update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToUpdateConsumable$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromConsumableActions.updateConsumableFailure),
        tap((action) => this.toastr.error( action.error,'Consumable update failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  AccessoryDeleted$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccessoriesActions.removeAccessory),
        tap( () =>this.toastr.success( 'The Accessory has been succesfully deleted', 'Delete succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  ConsumableDeleted = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromConsumableActions.removeConsumableSuccess),
        tap( () => this.toastr.success('The Consumable has been succesfully deleted', 'Delete succeded', OPTIONS))
      ),
      {dispatch: false}

  )

  GlassDeleted$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromGlassActions.removeGlassesuccess),
      tap( () => this.toastr.success('The Glass has been succesfully deleted', 'Delete succeded', OPTIONS))
    ),
    {dispatch: false}
  )

  unableToDeleteAccessory$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromAccessoriesActions.removeAccessoryFailure),
        tap((action) => this.toastr.error( action.error,'Accessory delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToDeleteGlass$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromGlassActions.removeGlassFailure),
        tap((action) => this.toastr.error( action.error,'Glass delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  unableToDeleteConsumable$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromConsumableActions.removeConsumableFailure),
        tap((action) => this.toastr.error( action.error,'Consumable delete failed', OPTIONS ))
      ),
      {dispatch: false}
  )

  constructor( private actions: Actions, private toastr: ToastrService) {

  }

}
