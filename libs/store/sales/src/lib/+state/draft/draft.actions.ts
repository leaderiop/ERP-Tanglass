import { createAction, props } from '@ngrx/store';
import { Draft } from '@tanglass-erp/core/sales';

/****************************************************************** */
/*****LOAD Drafts ** */
/****************************************************************** */

export const loadDrafts = createAction('[Draft] Load Draft');

export const loadDraftSuccess = createAction(
  '[Draft] Load Draft Success',
  props<{ draft: Draft[] }>()
);

export const loadDraftFailure = createAction(
  '[Draft] Load Draft Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****LOAD INDIVIDUAL Draft ** */
/****************************************************************** */

export const loadDraftById = createAction(
  '[Draft Card Component] Load Draft By Id',
  props<{ id: number }>()
);

export const loadDraftByIdSuccess = createAction(
  '[Draft Effect] Load Draft By Id Success',
  props<{ draft: Draft }>()
);

export const loadDraftByIdFailure = createAction(
  '[Draft Effect] Load Draft By Id Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD INDIVIDUAL Draft ** */
/****************************************************************** */

export const addDraft = createAction(
  '[List drafts Component] Add Draft'
  // props<{ draft: Draft }>()
);

export const addDraftSuccess = createAction(
  '[Draft Effect] Add Draft Success',
  props<{ draft: Draft }>()
);

export const addDraftFailure = createAction(
  '[Draft Effect] Add Draft Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Draft ** */
/****************************************************************** */

export const updateDraft = createAction(
  '[ drafts ] Update Draft',
  props<{ draft: Draft }>()
);
export const updateDraftSuccess = createAction(
  '[Draft ] Update Draft Success',
  props<{ draft: Draft }>()
);
export const updateDraftFailure = createAction(
  '[Draft ] Update Draft failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL Draft ** */
/****************************************************************** */

export const removeDrafts = createAction(
  '[ Draft ] Delete Draft',
  props<{ ids: number[] }>()
);
export const removeDraftSuccess = createAction(
  '[Draft ] Delete Draft Success',
  props<{ ids: number[] }>()
);
export const removeDraftFailure = createAction(
  '[Draft ] Delete Draft failure',
  props<{ error: any }>()
);

export const clearDraftState = createAction('[Draft] Clear Draft State');

export const selectDraft = createAction(
  '[Draft ] Select Draft ID ',
  props<{ id: number }>()
);


/****************************************************************** */
/*****COPIER INDIVIDUAL Draft ** */
/****************************************************************** */

export const copierDraft = createAction(
  '[List drafts Component] Copier Draft'
);

export const copierDraftSuccess = createAction(
  '[Draft Effect] Copier Draft Success',
  props<{ draft: Draft }>()
);

export const copierDraftFailure = createAction(
  '[Draft Effect] Copier Draft Failure',
  props<{ error: any }>()
);