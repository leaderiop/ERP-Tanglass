import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as QuotationActions from './quotation.actions';
import { Quotation } from '@tanglass-erp/core/sales';

export const QUOTATION_FEATURE_KEY = 'quotation';

export interface QuotationState extends EntityState<Quotation> {
  selectedId?: string | number; // which Quotation record has been selected
  selectedQuotation: Quotation;
  loaded: boolean; // has the Quotation list been loaded
  error?: string | null; // last known error (if any)
}

export interface QuotationPartialState {
  readonly [QUOTATION_FEATURE_KEY]: QuotationState;
}

export const quotationAdapter: EntityAdapter<Quotation> = createEntityAdapter<
  Quotation
>();

export const QuotationinitialState: QuotationState = quotationAdapter.getInitialState(
  {
    // set initial required properties
    selectedQuotation: null,
    loaded: false,
  }
);

const quotationReducer = createReducer(
  QuotationinitialState,
  on(QuotationActions.loadQuotations, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(QuotationActions.loadQuotationsSuccess, (state, { quotations }) =>
    quotationAdapter.setAll(quotations, { ...state, loaded: true })
  ),
  on(QuotationActions.loadQuotationByIdSuccess, (state, { quotation }) => ({
    ...state,
    selectedQuotation: quotation,
  })),
  on(QuotationActions.addQuotationSuccess, (state, action) =>
    quotationAdapter.addOne(action.quotation, state)
  ),

  on(QuotationActions.deleteQuotationsSuccess, (state, action) =>
    quotationAdapter.removeMany(action.ids, state)
  ),
  on(
    QuotationActions.loadQuotationsFailure,
    QuotationActions.deleteQuotationsFailure,
    QuotationActions.addQuotationFailure,
    QuotationActions.TransformToOrderFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducerQuotation(
  state: QuotationState | undefined,
  action: Action
) {
  return quotationReducer(state, action);
}
