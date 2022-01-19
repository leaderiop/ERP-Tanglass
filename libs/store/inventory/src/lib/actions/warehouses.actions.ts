import { createAction, props } from '@ngrx/store';
import { InsertedWarehouse, Warehouse } from '@tanglass-erp/core/inventory';
import { RequireExactlyOne } from '@tanglass-erp/core/common';

export const loadWarehouses = createAction('[Warehouses] Load Warehouses');

export const loadWarehousesSuccess = createAction(
  '[Warehouses] Load Warehouses Success',
  props<{ warehouses: Warehouse[] }>()
);

export const loadWarehousesFailure = createAction(
  '[Warehouses] Load Warehouses Failure',
  props<{ error: any }>()
);


// *** Load By Id ***
export const loadWarehouseById = createAction(
  '[Warehouses] Load Warehouse By Id',
  props<{ id: any }>());

export const loadWarehouseByIdSuccess = createAction(
  '[Warehouses] Load Warehouse By Id Success',
  props<{ warehouse: Warehouse }>()
);

export const loadWarehouseByIdFailure = createAction(
  '[Warehouses] Load Warehouse By Id Failure',
  props<{ error: any}>()
);


// *** Add ***
export const addWarehouse = createAction(
  '[Warehouses] Add Warehouse',
  props<{ warehouse: InsertedWarehouse }>()
);

export const addWarehouseSuccess = createAction(
  '[Warehouses] Add Warehouse Success',
  props<{ warehouse: Warehouse }>()
);

export const addWarehouseFailure = createAction(
  '[Warehouses] Add Warehouse Failure',
  props<{ error: any}>()
);


// *** Update ***
export const updateWarehouse = createAction(
  '[Warehouses] update Warehouse',
  props<{ warehouse: RequireExactlyOne<InsertedWarehouse, "id"> }>()
);

export const updateWarehouseSuccess = createAction(
  '[Warehouses] update Warehouse Success',
  props<{ warehouse: Warehouse }>()
);

export const updateWarehouseFailure = createAction(
  '[Warehouses] update Warehouse Failure',
  props<{ error: any}>()
);



// *** Remove ***
export const removeWarehouses = createAction(
  '[Warehouses] remove Warehouses',
  props<{ ids: string[] }>()
);

export const removeWarehousesSuccess = createAction(
  '[Warehouses] remove Warehouse Success',
  props<{ ids: string[] }>()
);

export const removeWarehousesFailure = createAction(
  '[Warehouses] remove Warehouse Failure',
  props<{ error: any}>()
);
