import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as PaymentsActions from './payments.actions';
import { Payment as PaymentsEntity } from '@tanglass-erp/core/sales';

export const PAYMENTS_FEATURE_KEY = 'payments';

export interface PaymentState extends EntityState<PaymentsEntity> {
  selectedId?: string | number; // which Payments record has been selected
  selectedPayments: PaymentsEntity[];
  loaded: boolean; // has the Payments list been loaded
  error?: string | null; // last known error (if any)
}

export interface PaymentsPartialState {
  readonly [PAYMENTS_FEATURE_KEY]: PaymentState;
}

export const paymentsAdapter: EntityAdapter<PaymentsEntity> = createEntityAdapter<
  PaymentsEntity
>();

export const payment_initialState: PaymentState = paymentsAdapter.getInitialState(
  {
    // set initial required properties
    selectedPayments: [],
    loaded: false,
  }
);

const paymentsReducer = createReducer(
  payment_initialState,
  on(PaymentsActions.loadPayments, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PaymentsActions.loadPaymentsSuccess, (state, { payments }) =>
    paymentsAdapter.setAll(payments, { ...state, loaded: true })
  ),
  // on(PaymentsActions.loadOrderPaymentsSuccess, (state, { payments }) => ({
  //   ...state,
  //   selectedPayments: payments,
  // })),
  on(PaymentsActions.addPaymentSuccess, (state, action) =>
    paymentsAdapter.addOne(action.payment, state)
  ),
  on(PaymentsActions.setOrderPayments, (state, { payments }) =>
    paymentsAdapter.setAll(payments, { ...state, loaded: true })
  ),
  on(
    PaymentsActions.loadPaymentsFailure,
    ///PaymentsActions.loadOrderPaymentsFailure,
    PaymentsActions.addPaymentFailure,
    PaymentsActions.removePaymentFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducerPayment(
  state: PaymentState | undefined,
  action: Action
) {
  return paymentsReducer(state, action);
}
