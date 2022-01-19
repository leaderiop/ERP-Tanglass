import { createAction, props } from '@ngrx/store';
import { Payment as PaymentsEntity } from '@tanglass-erp/core/sales';

export const loadPayments = createAction('[Payments] Load Payments');

export const loadPaymentsSuccess = createAction(
  '[Payments] Load Payments Success',
  props<{ payments: PaymentsEntity[] }>()
);

export const loadPaymentsFailure = createAction(
  '[Payments] Load Payments Failure',
  props<{ error: any }>()
);



/****************************************************************** */
/*****LOAD INDIVIDUAL PAYMENT ** */
/****************************************************************** */

export const loadPaymentById = createAction(
  '[payment  ] Load payment  By Id',
  props<{ id: any }>()
);


export const loadPaymentByIdSuccess = createAction(
  '[payment ] Load  By Id Success',
  props<{ payment: PaymentsEntity }>()
);

export const loadPaymentByIdFailure = createAction(
  '[payment ] Load payment By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD ORDER PAYMENTS ** */
/****************************************************************** */

// export const loadOrderPayments = createAction(
//   '[payment  ] Load Order Payments ',
//   props<{ order_id: number }>()
// );


// export const loadOrderPaymentsSuccess = createAction(
//   '[payment ] Load Order Payments Success',
//   props<{ payments: PaymentsEntity[] }>()
// );

// export const loadOrderPaymentsFailure = createAction(
//   '[payment ] Load Order Payments  Failure',
//   props<{ error: any }>()
// );

/****************************************************************** */
/*****ADD INDIVIDUAL PAYMENT ** */
/****************************************************************** */

export const addPayment = createAction(
  '[  Payment ] Add  Payment',
  props<{ payment: PaymentsEntity }>()
);

export const addPaymentSuccess = createAction(
  '[  Payment ] Add   Payment Success',
  props<{ payment: PaymentsEntity }>()
);

export const addPaymentFailure = createAction(
  '[  Payment ] Add   Payment Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****UPDATE INDIVIDUAL PAYMENT ** */
/****************************************************************** */

export const updatePayment = createAction(
  '[Payment] Update Payment',
  props<{ Payment: PaymentsEntity }>()
);
export const updatePaymentSuccess = createAction(
  '[Payment ] Update Payment Success',
  props<{ Payment: PaymentsEntity }>()
);
export const updatePaymentFailure = createAction(
  '[Payment ] Update Payment failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL PAYMENT ** */
/****************************************************************** */

export const removePayment = createAction(
  '[Payment ] Delete Payment',
  props<{ PaymentId: string }>()
);
export const removePaymentSuccess = createAction(
  '[Payment ] Delete Payment Success',
  props<{ PaymentId: string }>()
);
export const removePaymentFailure = createAction(
  '[Payment ] Delete Payment failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****SET ORDER PAYMENTS WHEN  LOADING ORDER BY ID** */
/****************************************************************** */

export const setOrderPayments = createAction(
  '[payment in order page  ] Set Order Payments ',
  props<{ payments: PaymentsEntity[] }>()

);


