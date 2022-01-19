import { createAction, props } from '@ngrx/store';
import {
  Adjustment as StockAdjustmentsEntity,
  InsertedAdjustment,
  SubstanceWarehouse
} from '@tanglass-erp/core/inventory';

/****************************************************************** */
/*****LOAD ALL ADJUSTMENTS ** */
/****************************************************************** */

export const loadStockAdjustments = createAction(
  '[StockAdjustments] Load StockAdjustments'
);

export const loadStockAdjustmentsSuccess = createAction(
  '[StockAdjustments] Load StockAdjustments Success',
  props<{ stockAdjustments: StockAdjustmentsEntity[] }>()
);

export const loadStockAdjustmentsFailure = createAction(
  '[StockAdjustments] Load StockAdjustments Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****LOAD STOCK IN HANDS QUANTITYS ** */
/****************************************************************** */

export const loadStockInHand = createAction(
  '[StockAdjustments] Load StockInHand'
);

export const loadStockInHandSuccess = createAction(
  '[StockAdjustments] Load StockInHand Success',
  props<{ StockInHand: SubstanceWarehouse[] }>()
);

export const loadStockInHandFailure = createAction(
  '[StockAdjustments] Load StockInHand Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****UPDATE STOCK IN HANDS QUANTITY OF ONE (SUBSTANCE,WAREHOUSE) COMBINAISON ** */
/****************************************************************** */

export const addAdjustment = createAction(
  '[Add Adjustment Component] Add  Adjustment',
  props<{ adjustment: InsertedAdjustment }>()
);

export const addAdjustmentSuccess = createAction(
  '[Adjustment Effect] Add Adjustment Success',
  props<{ adjustment: StockAdjustmentsEntity }>()
);

export const addAdjustmentFailure = createAction(
  '[Adjustment Effect]Add Adjustment Failure',
  props<{ error: any }>()
);
