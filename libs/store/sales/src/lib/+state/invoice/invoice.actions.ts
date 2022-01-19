import { createAction, props } from '@ngrx/store';
import { InsertedInvoice, Invoice, invoiceFilter, UpdatedInvoice } from '@tanglass-erp/core/sales';

export const prepareInvoiceLines = createAction(
  '[Invoice] prepare InvoiceLines',
  props<{deliveries: any}>()
);

export const prepareInvoiceLinesSuccess = createAction(
  '[Invoice] prepare InvoiceLines Success',
  props<{invoiceLines: any}>()
);

export const prepareInvoiceLinesFailure = createAction(
  '[Invoice] prepare InvoiceLines Failure',
  props<{error: any}>()
);


export const loadInvoices = createAction(
  '[Invoice] Load Invoice',
  props<invoiceFilter>()
);

export const loadInvoicesSuccess = createAction(
  '[Invoice] Load Invoice Success',
  props<{ invoices: Invoice[] }>()
);

export const loadInvoicesFailure = createAction(
  '[Invoice] Load Invoice Failure',
  props<{ error: any }>()
);

// loadInvoiceById

export const loadInvoiceById = createAction(
  '[Invoice] Load Invoice By Id',
  props<{ id: string }>()
);

export const loadInvoiceByIdSuccess = createAction(
  '[Invoice] Load Invoice By Id Success',
  props<{ invoice: UpdatedInvoice }>()
);

export const loadInvoiceByIdFailure = createAction(
  '[Invoice] Load Invoice By Id Failure',
  props<{ error: any }>()
);

// addInvoice

export const addInvoice = createAction(
  '[Invoice] add Invoice',
  props<{ invoice: InsertedInvoice }>()
);

export const addInvoiceSuccess = createAction(
  '[Invoice] add Invoice Success',
  props<{ invoice: InsertedInvoice }>()
);

export const addInvoiceFailure = createAction(
  '[Invoice] add Invoice Failure',
  props<{ error: any }>()
);

// updateInvoice

export const updateInvoice = createAction(
  '[Invoice] update Invoice',
  props<{ invoice: UpdatedInvoice }>()
);

export const updateInvoiceSuccess = createAction(
  '[Invoice] update Invoice Success',
  props<{ invoice: Invoice }>()
);

export const updateInvoiceFailure = createAction(
  '[Invoice] update Invoice Failure',
  props<{ error: any }>()
);

// deleteInvoices

export const deleteInvoices = createAction(
  '[Invoice] delete Invoices',
  props<{ ids: string[] }>()
);

export const deleteInvoicesSuccess = createAction(
  '[Invoice] delete Invoices Success',
  props<{ ids: string[] }>()
);

export const deleteInvoicesFailure = createAction(
  '[Invoice] delete Invoices Failure',
  props<{ error: any }>()
);
