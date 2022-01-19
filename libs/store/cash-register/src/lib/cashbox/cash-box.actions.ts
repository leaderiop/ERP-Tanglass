import { createAction, props } from '@ngrx/store';
import { ShortFeature } from '@tanglass-erp/core/common';
import { CashBox, InsertedCashBox, InsertedPayment } from '@tanglass-erp/core/cash-register';


// Salepoints

export const loadCashBoxSalePoints = createAction(
  '[CashBox] Load SalePoints'
);

export const loadCashBoxSalePointsSuccess = createAction(
  '[CashBox] Load SalePoints Success',
  props<{ salepoints: ShortFeature[] }>()
);

export const loadCashBoxSalePointsFailure = createAction(
  '[CashBox] Load SalePoints Failure',
  props<{ error: any }>()
);


export const loadCashBox = createAction(
  '[CashBox] Load CashBox',
  props<{id: number, salepoint_id: string}>()
);

export const loadCashBoxSuccess = createAction(
  '[CashBox] Load CashBox Success',
  props<{ cashBox: CashBox }>()
);

export const loadCashBoxFailure = createAction(
  '[CashBox] Load CashBox Failure',
  props<{ error: any }>()
);

 // Add CashBox

export const addCashBox = createAction(
  '[CashBox] Add CashBox',
  props<{cashBox: InsertedCashBox}>()
);

export const addCashBoxSuccess = createAction(
  '[CashBox] Add CashBox Success');

export const addCashBoxFailure = createAction(
  '[CashBox] Add CashBox Failure',
  props<{ error: any }>()
);

// Add Payment

export const addPayment = createAction(
  '[CashBox] Add Payment',
  props<{payment: InsertedPayment}>()
);

export const addPaymentSuccess = createAction(
  '[CashBox] Add Payment Success');

export const addPaymentFailure = createAction(
  '[CashBox] Add Payment Failure',
  props<{ error: any }>()
);



