import { createAction, props } from '@ngrx/store';
import { ShortSubstance } from '@tanglass-erp/core/common';

export const loadShortProduct = createAction(
  '[ShortProduct] Load ShortProduct'
);

export const loadShortProductSuccess = createAction(
  '[ShortProduct] Load ShortProduct Success',
  props<{ shortProduct: ShortSubstance[] }>()
);

export const loadShortProductFailure = createAction(
  '[ShortProduct] Load ShortProduct Failure',
  props<{ error: any }>()
);
