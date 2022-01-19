import { createAction, props } from '@ngrx/store';
import { InsertedQuotation, invoiceFilter, Order, Quotation, TransformedQuotation } from '@tanglass-erp/core/sales';

export const loadQuotations = createAction(
  '[Quotations] Load Quotations',
  props<invoiceFilter>()
);

export const loadQuotationsSuccess = createAction(
  '[Quotations] Load Quotations Success',
  props<{ quotations: Quotation[] }>()
);

export const loadQuotationsFailure = createAction(
  '[Quotations] Load Quotations Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****LOAD INDIVIDUAL Quotation ** */
/****************************************************************** */

export const loadQuotationById = createAction(
  '[Quotation Card Component] Load Quotation By Id',
  props<{ id: number }>()
);

export const loadQuotationByIdSuccess = createAction(
  '[Quotation Effect] Load Quotation By Id Success',
  props<{ quotation: Quotation }>()
);

export const loadQuotationByIdFailure = createAction(
  '[Quotation Effect] Load Quotation By Id Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD INDIVIDUAL Quotation ** */
/****************************************************************** */

export const addQuotation = createAction(
  '[Quotation Component] Add Quotation',
  props<{ quotation: InsertedQuotation }>()
);

export const addQuotationSuccess = createAction(
  '[Quotation Effect] Add Quotation Success',
  props<{ quotation: Quotation }>()
);

export const addQuotationFailure = createAction(
  '[Quotation Effect] Add Quotation Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Quotation ** */
/****************************************************************** */

export const updateQuotation = createAction(
  '[Quotation Component] update Quotation',
  props<{ quotation: Partial<InsertedQuotation> }>()
);

export const updateQuotationSuccess = createAction(
  '[Quotation Effect] update Quotation Success',
  props<{ quotation: any }>()
);

export const updateQuotationFailure = createAction(
  '[Quotation Effect] update Quotation Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****Delete Quotations ** */
/****************************************************************** */

export const deleteQuotations = createAction(
  '[Quotation Component] Delete Quotations',
  props<{ ids: number[] }>()
);

export const deleteQuotationsSuccess = createAction(
  '[Quotation Effect] Delete Quotations Success',
  props<{ ids: number[] }>()
);

export const deleteQuotationsFailure = createAction(
  '[Quotation Effect] Delete Quotations Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****TRANSFORM  ORDER TO QUOTATION ** */
/****************************************************************** */

export const TransformToOrder = createAction(
  '[Quotation Card  Component] Transform Quotation To Order',
  props<{ transformingVariables: TransformedQuotation}>()
);

export const TransformToOrderSuccess = createAction(
  '[Quotation Effect] Transform Quotation To Order Success',
  props<{ order: Order }>()
);

export const TransformToOrderFailure = createAction(
  '[Quotation Effect] Transform Quotation To Order Failure',
  props<{ error: any }>()
);
