import { createAction, props } from '@ngrx/store';
import { OrdersSalepointEntity } from './orders-salepoint.models';

export const loadOrdersSalepoint = createAction(
  '[OrdersSalepoint] Load OrdersSalepoint',
  props<{salepoint_id: string}>()
);

export const loadOrdersSalepointSuccess = createAction(
  '[OrdersSalepoint] Load OrdersSalepoint Success',
  props<{ordersSalepoint: OrdersSalepointEntity[]}>()
);

export const loadOrdersSalepointFailure = createAction(
  '[OrdersSalepoint] Load OrdersSalepoint Failure',
  props<{ error: any }>()
);
