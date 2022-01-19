import { createAction, props } from '@ngrx/store';
import { Substance } from '@tanglass-erp/core/common';

/****************************************************************** */
/*****LOAD GLASSES  ** */
/****************************************************************** */

export const loadWarehouseGlasses = createAction(
  '[WarehouseGlasses] Load WarehouseGlasses',
  props<{ id: any }>()
);

export const loadWarehouseGlassesSuccess = createAction(
  '[WarehouseGlasses] Load WarehouseGlasses Success',
  props<{ warehouseGlass: Substance[] }>()
);

export const loadWarehouseGlassesFailure = createAction(
  '[WarehouseGlasses] Load WarehouseGlasses Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****LOAD Accessories ** */
/****************************************************************** */

export const loadWarehouseAccessories = createAction(
  '[WarehouseSubstance] Load WarehouseAccessories',
  props<{ id: any }>()
);

export const loadWarehouseAccessoriesSuccess = createAction(
  '[WarehouseSubstance] Load WarehouseAccessories Success',
  props<{ warehouseSubstance: Substance[] }>()
);

export const loadWarehouseAccessoriesFailure = createAction(
  '[WarehouseSubstance] Load WarehouseAccessories Failure',
  props<{ error: any }>()
);