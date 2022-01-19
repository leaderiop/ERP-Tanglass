import { createAction, props } from '@ngrx/store';
import { Substance } from '@tanglass-erp/core/common';

export const loadWarehouseAccessory = createAction(
  '[WarehouseAccessory] Load WarehouseAccessory',
  props<{ id: any }>()

);

export const loadWarehouseAccessorySuccess = createAction(
  '[WarehouseAccessory] Load WarehouseAccessory Success',
  props<{ warehouseAccessory: Substance[] }>()
);

export const loadWarehouseAccessoryFailure = createAction(
  '[WarehouseAccessory] Load WarehouseAccessory Failure',
  props<{ error: any }>()
);
