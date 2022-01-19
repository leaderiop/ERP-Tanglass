import { Companie, DetailedCompanie } from '@tanglass-erp/core/management';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD COMPANIES ** */
/****************************************************************** */

export const loadCompanies= createAction('[Companies Component] Load Companies');


export const loadCompaniesSuccess = createAction(
  '[Companie Effect] Load Companies Success',
  props<{ companies: Companie[] }>()
);

export const loadCompaniesFailure = createAction(
  '[Companie Effect] Load Companies Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL COMPANIE ** */
/****************************************************************** */

export const loadCompanieById = createAction(
  '[Companie Card Component] Load Companie By Id',
  props<{ id: any }>()
  );


export const loadCompanieByIdSuccess = createAction(
  '[Companie Effect] Load Companie By Id Success',
  props<{ companie: DetailedCompanie }>()
);

export const loadCompanieByIdFailure = createAction(
  '[Companie Effect] Load Companie By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL COMPANIE ** */
/****************************************************************** */

export const addCompanie = createAction(
  '[Companies Component] Add Companie',
  props<{ companie: Companie }>()
);

export const addCompanieSuccess = createAction(
  '[Companie Effect] Add Companie Success',
  props<{ companie: Companie }>()
);

export const addCompanieFailure = createAction(
  '[Companie Effect] Add Companie Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL COMPANIE ** */
/****************************************************************** */

export const updateCompanie = createAction(
  '[Companies Component] Update Companie',
  props<{ companie: Companie }>()
);
export const updateCompanieSuccess = createAction(
  '[Companie Effect] Update Companie Success',
  props<{ companie: Companie }>()
);
export const updateCompanieFailure = createAction(
  '[Companie Effect] Update Companie failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL COMPANIE ** */
/****************************************************************** */

export const removeCompanie = createAction(
  '[Companies Component] Delete Companie',
  props<{ companieId: any }>()
);
export const removeCompanieSuccess = createAction(
  '[Companie Effect] Delete Companie Success',
  props<{ companieId: any }>()
);
export const removeCompanieFailure = createAction(
  '[Companie Effect] Delete Companie failure',
  props<{ error: any }>()
);
