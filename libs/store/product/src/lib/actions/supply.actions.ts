import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD Supplies ** */
/****************************************************************** */

export const loadSupplies= createAction('[List supplies Component] Load Supplies');


export const loadSuppliesSuccess = createAction(
  '[Supply Effect] Load Supplies Success',
  props<{ supplies: any[] }>()
);

export const loadSuppliesFailure = createAction(
  '[Supply Effect] Load Supplies Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL Supply ** */
/****************************************************************** */

export const loadSupplyById = createAction(
  '[Supply Card Component] Load Supply By Id',
  props<{ id: any }>()
  );


export const loadSupplyByIdSuccess = createAction(
  '[Supply Effect] Load Supply By Id Success',
  props<{ supply: any }>()
);

export const loadSupplyByIdFailure = createAction(
  '[Supply Effect] Load Supply By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL Supply ** */
/****************************************************************** */

export const addSupply = createAction(
  '[List supplies Component] Add Supply',
  props<{ supply: any }>()
);

export const addSupplySuccess = createAction(
  '[Supply Effect] Add Supply Success',
  props<{ supply: any }>()
);

export const addSupplyFailure = createAction(
  '[Supply Effect] Add Supply Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Supply ** */
/****************************************************************** */

export const updateSupply = createAction(
  '[List supplies Component] Update Supply',
  props<{ supply: any }>()
);
export const updateSupplySuccess = createAction(
  '[Supply Effect] Update Supply Success',
  props<{ supply: any }>()
);
export const updateSupplyFailure = createAction(
  '[Supply Effect] Update Supply failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL Supply ** */
/****************************************************************** */

export const removeSupply = createAction(
  '[List supplies Component] Delete Supply',
  props<{ supplyId: any }>()
);
export const removeSupplySuccess = createAction(
  '[Supply Effect] Delete Supply Success',
  props<{ supplyId: any }>()
);
export const removeSupplyFailure = createAction(
  '[Supply Effect] Delete Supply failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE MANY Supplies ** */
/****************************************************************** */

export const removeSupplies = createAction(
  '[List Supplies ] Delete Supplies',
  props<{ ids: string[] }>()
);
export const removeSuppliesSuccess = createAction(
  '[Supplies ] Delete Supplies Success',
  props<{ ids: string[] }>()
);
export const removeSuppliesFailure = createAction(
  '[Supplies ] Delete Supplies failure',
  props<{ error: any }>()
);