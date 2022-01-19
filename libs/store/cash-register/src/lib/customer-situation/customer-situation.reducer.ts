import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CustomerSituationActions from './customer-situation.actions';
import { CustomerSituation } from './customer-situation.models';

export const CUSTOMER_SITUATION_FEATURE_KEY = 'customerSituation';

export interface State extends EntityState<CustomerSituation> {
  selectedId?: string | number; // which CustomerSituation record has been selected
  loaded: boolean; // has the CustomerSituation list been loaded
  error?: string | null; // last known error (if any)
}

export interface CustomerSituationPartialState {
  readonly [CUSTOMER_SITUATION_FEATURE_KEY]: State;
}

export const customerSituationAdapter: EntityAdapter<CustomerSituation> = createEntityAdapter<
  CustomerSituation
>({selectId: e => e.order_ref});

export const initialState: State = customerSituationAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const customerSituationReducer = createReducer(
  initialState,
  on(CustomerSituationActions.loadCustomerSituation, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    CustomerSituationActions.loadCustomerSituationSuccess,
    (state, { customerSituation }) =>
      customerSituationAdapter.setAll(customerSituation, {
        ...state,
        loaded: true,
      })
  ),
  on(
    CustomerSituationActions.loadCustomerSituationFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return customerSituationReducer(state, action);
}
