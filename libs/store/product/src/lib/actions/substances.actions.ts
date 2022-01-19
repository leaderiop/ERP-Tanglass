import { createAction, props } from '@ngrx/store';
import { Substance } from '@tanglass-erp/core/product';

export const loadSubstances = createAction('[Substances] Load Substances');

export const loadSubstancesSuccess = createAction(
  '[Substances] Load Substances Success',
  props<{ substances: Substance[] }>()
);

export const loadSubstancesFailure = createAction(
  '[Substances] Load Substances Failure',
  props<{ error: any }>()
);
