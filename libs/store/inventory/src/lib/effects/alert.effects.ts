import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromWarehousesActions from '../actions/warehouses.actions';
import * as fromTransferOrderActions from '../actions/transferOrder.actions';
import * as fromAccessoryWarehouseActions from '../actions/wareHouseAccessory.actions';
import * as fromConsumableWarehouseActions from '../actions/warehouseConsumable.actions';
import * as fromGlassWarehouseActions from '../actions/warehouseGlass.actions';
import { ToastrService } from 'ngx-toastr';


const OPTIONS = {
  positionClass : 'toast-bottom-center',
  closeButton: true,
  disableTimeOut: true
 }

@Injectable()
export class AlertEffects {

  unableToLoadWarehouses$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromWarehousesActions.loadWarehousesFailure),
      tap((action) => this.toastr.error( action.error, 'Load Warehouses failed', OPTIONS))
    ),
    {dispatch: false}

  )
  unableToLoadGlassWarehouses$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromGlassWarehouseActions.loadGlassWarehousesFailure),
      tap((action) => this.toastr.error( action.error, 'Load Glass Warehouses failed', OPTIONS))
    ),
    {dispatch: false}

  )
  unableToLoadConsumableWarehouses$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromConsumableWarehouseActions.loadConsumableWarehousesFailure),
      tap((action) => this.toastr.error( action.error, 'Load Consumable Warehouses failed', OPTIONS))
    ),
    {dispatch: false}

  )
  unableToLoadccessoryWarehouses$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromAccessoryWarehouseActions.loadWareHouseAccessoriesFailure),
      tap((action) => this.toastr.error( action.error, 'Load Accessory Warehouses failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadTransferOrders$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromTransferOrderActions.loadTransferOrdersFailure),
      tap( (action) => this.toastr.error(action.error, 'Load transfer orders failed', OPTIONS))
    ),
    {dispatch: false}
  )


  unableToLoadWarehousesById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromWarehousesActions.loadWarehouseByIdFailure),
      tap((action) => this.toastr.error( action.error, 'Load Warehouse by id failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadGlassWarehousesById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromGlassWarehouseActions.loadGlassWarehousesFailure),
      tap((action) => this.toastr.error( action.error, 'Load glass Warehouse by id failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadConsumableWarehousesById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromConsumableWarehouseActions.loadWareHouseConsumableByIdFailure),
      tap((action) => this.toastr.error( action.error, 'Load Consumable Warehouse by id failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadAccessoryWarehousesById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromAccessoryWarehouseActions.loadWareHouseAccessorieByIdFailure),
      tap((action) => this.toastr.error( action.error, 'Load Accessory Warehouse by id failed', OPTIONS))
    ),
    {dispatch: false}

  )

  unableToLoadTransferOrdersById$ = createEffect(
    () =>
    this.actions.pipe(
      ofType(fromTransferOrderActions.loadTransferOrdersFailure),
      tap( (action) => this.toastr.error(action.error, 'Load TransferOrder by id failed', OPTIONS))
    ),
    {dispatch: false}
  )

  WarehouseCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromWarehousesActions.addWarehouseSuccess),
        tap( (action) => {
          return this.toastr.success( 'The Warehouse: ' + action.warehouse.name + ' has been created', 'Creation succeded', OPTIONS)
        } )
      ),
      {dispatch: false}

  )

  TransferOrderCreated$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromTransferOrderActions.addTransferOrderSuccess),
        tap( (action) => this.toastr.success('The Transfer Order has been created', 'Creation succeded', OPTIONS))
      ),
      {dispatch: false}

  )


  unableToCreateWarehouse$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromWarehousesActions.addWarehouseFailure),
        tap((action) => this.toastr.error( action.error,'Warehouse creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )


  unableToCreateTransferOrder$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromTransferOrderActions.addTransferOrderFailure),
        tap((action) => this.toastr.error( action.error,'TransferOrder creation failed', OPTIONS ))
      ),
      {dispatch: false}
  )



  constructor( private actions: Actions, private toastr: ToastrService) {

  }

}
