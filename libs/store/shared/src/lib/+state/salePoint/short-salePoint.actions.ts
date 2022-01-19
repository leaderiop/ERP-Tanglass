import { createAction, props } from '@ngrx/store';
import { PartialPOS } from '@tanglass-erp/core/common';

/****************************************************************** */
/*****LOAD SHORT SALEPOINTS ** */
/****************************************************************** */

export const loadShortSalePoint = createAction(
  '[ShortSalePoint] Load ShortSalePoint',
  props<{ ids?: string[] }>()
);

export const loadShortSalePointSuccess = createAction(
  '[ShortSalePoint] Load ShortSalePoint Success',
  props<{ shortSalePoint: PartialPOS[] }>()
);

export const loadShortSalePointFailure = createAction(
  '[ShortSalePoint] Load ShortSalePoint Failure',
  props<{ error: any }>()
);
