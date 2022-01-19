import { createAction, props } from '@ngrx/store';
import { CustomerSituation } from './customer-situation.models';

export const loadCustomerSituation = createAction(
  '[CustomerSituation] Load CustomerSituation',
  props<{customer_id: string}>()
);

export const loadCustomerSituationSuccess = createAction(
  '[CustomerSituation] Load CustomerSituation Success',
  props<{ customerSituation: CustomerSituation[] }>()
);

export const loadCustomerSituationFailure = createAction(
  '[CustomerSituation] Load CustomerSituation Failure',
  props<{ error: any }>()
);
