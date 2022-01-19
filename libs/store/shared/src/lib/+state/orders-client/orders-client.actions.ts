import { createAction, props } from '@ngrx/store';


/****************************************************************** */
/*****load Client Orders ** */
/****************************************************************** */

export const loadClientOrders = createAction(
  '[CLientOrders] load Client Orders',
  props<{client: string}>()
  );

export const loadClientOrdersSuccess = createAction(
  '[CLientOrders] load Client Orders Success',
  props<{ orders: any[] }>()
);

export const loadClientOrdersFailure = createAction(
  '[CLientOrders] load Client Orders Failure',
  props<{ error: any }>()
);
