import { createAction, props } from '@ngrx/store';
import { ShortWarehouse } from '@tanglass-erp/core/common';

export const loadShortWarehouse = createAction(
  '[ShortWarehouse] Load ShortWarehouse'
);

export const loadShortWarehouseSuccess = createAction(
  '[ShortWarehouse] Load ShortWarehouse Success',
  props<{ shortWarehouse: ShortWarehouse[] }>()
);

export const loadShortWarehouseFailure = createAction(
  '[ShortWarehouse] Load ShortWarehouse Failure',
  props<{ error: any }>()
);
