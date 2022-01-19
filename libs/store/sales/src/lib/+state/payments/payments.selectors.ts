import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PAYMENTS_FEATURE_KEY, paymentsAdapter, PaymentsPartialState, PaymentState } from './payments.reducer';

// Lookup the 'Payments' feature state managed by NgRx
export const getPaymentsState = createFeatureSelector<
  PaymentsPartialState,
  PaymentState
>(PAYMENTS_FEATURE_KEY);

const { selectAll, selectEntities } = paymentsAdapter.getSelectors();

export const getPaymentsLoaded = createSelector(
  getPaymentsState,
  (state: PaymentState) => state.loaded
);

export const getPaymentsError = createSelector(
  getPaymentsState,
  (state: PaymentState) => state.error
);

export const getAllPayments = createSelector(
  getPaymentsState,
  (state: PaymentState) => selectAll(state)
);

export const getPaymentsEntities = createSelector(
  getPaymentsState,
  (state: PaymentState) => selectEntities(state)
);

export const getSelectedPaymentId = createSelector(
  getPaymentsState,
  (state: PaymentState) => state.selectedId
);

export const getSelectedOrderPayments = createSelector(
  getPaymentsState,
  (state: PaymentState) => state.selectedPayments
);

export const getSelectedPayment = createSelector(
  getPaymentsEntities,
  getSelectedPaymentId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
