import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as InvoiceActions from './invoice.actions';
import { InsertedInvoice, Invoice } from '@tanglass-erp/core/sales';

export const INVOICE_FEATURE_KEY = 'invoice';

export interface State extends EntityState<Invoice> {
  selectedInvoice?: InsertedInvoice; // which Invoiceinvoice record has been selected
  loaded: boolean; // has the Invoiceinvoice list been loaded
  invoiceLines: Array<any>,
  error?: string | null; // last known error (if any)
}

export interface InvoicePartialState {
  readonly [INVOICE_FEATURE_KEY]: State;
}

export const invoiceAdapter: EntityAdapter<Invoice> = createEntityAdapter<
  Invoice
>();

export const initialState: State = invoiceAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  invoiceLines: null
});

const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoices, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(InvoiceActions.prepareInvoiceLines, (state) => ({
    ...state,
    invoiceLines: null
  })),
  on(InvoiceActions.prepareInvoiceLinesSuccess, (state, {invoiceLines}) => ({
    ...state,
    invoiceLines,
  })),
  on(InvoiceActions.loadInvoiceById, (state) => ({
    ...state,
    selectedInvoice: null,
  })),
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) =>
    invoiceAdapter.setAll(invoices, { ...state, loaded: true })
  ),
  on(InvoiceActions.loadInvoiceByIdSuccess, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
  })),
  on(InvoiceActions.addInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    selectedInvoice: invoice,
  })),
  on(InvoiceActions.updateInvoiceSuccess, (state, { invoice }) =>
    invoiceAdapter.updateOne({ id: invoice.id, changes: invoice }, state)
  ),
  on(InvoiceActions.deleteInvoicesSuccess, (state, { ids }) =>
    invoiceAdapter.removeMany(ids, state)
  ),
  on(
    InvoiceActions.loadInvoicesFailure,
    InvoiceActions.loadInvoiceByIdFailure,
    InvoiceActions.addInvoiceFailure,
    InvoiceActions.updateInvoiceFailure,
    InvoiceActions.deleteInvoicesFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return invoiceReducer(state, action);
}
