import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QUOTATION_FEATURE_KEY, quotationAdapter, QuotationPartialState, QuotationState } from './quotation.reducer';

// Lookup the 'Quotation' feature state managed by NgRx
export const getQuotationState = createFeatureSelector<
  QuotationPartialState,
  QuotationState
>(QUOTATION_FEATURE_KEY);

const { selectAll, selectEntities } = quotationAdapter.getSelectors();

export const getQuotationLoaded = createSelector(
  getQuotationState,
  (state: QuotationState) => state.loaded
);

export const getQuotationError = createSelector(
  getQuotationState,
  (state: QuotationState) => state.error
);

export const getAllQuotation = createSelector(
  getQuotationState,
  (state: QuotationState) => selectAll(state)
);

export const getQuotationEntities = createSelector(
  getQuotationState,
  (state: QuotationState) => selectEntities(state)
);

export const getSelectedIdQuotation = createSelector(
  getQuotationState,
  (state: QuotationState) => state.selectedId
);

export const getLoadedQuotation = createSelector(
  getQuotationState,
  (state: QuotationState) => state.selectedQuotation
);

export const getSelectedQuotation = createSelector(
  getQuotationEntities,
  getSelectedIdQuotation,
  (entities, selectedId) => selectedId && entities[selectedId]
);
