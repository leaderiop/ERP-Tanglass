import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INVOICE_FEATURE_KEY, invoiceAdapter, InvoicePartialState, State } from './invoice.reducer';

// Lookup the 'Invoiceinvoice' feature state managed by NgRx
export const getInvoiceState = createFeatureSelector<
  InvoicePartialState,
  State
>(INVOICE_FEATURE_KEY);

const { selectAll, selectEntities } = invoiceAdapter.getSelectors();

export const getInvoiceLoaded = createSelector(
  getInvoiceState,
  (state: State) => state.loaded
);

export const getInvoiceError = createSelector(
  getInvoiceState,
  (state: State) => state.error
);

export const getInvoiceLines = createSelector(
  getInvoiceState,
  (state: State) => state.invoiceLines
);

export const getAllInvoice = createSelector(
  getInvoiceState,
  (state: State) => selectAll(state)
);

export const getSelected = createSelector(
  getInvoiceState,
  (state: State) => state.selectedInvoice
);
