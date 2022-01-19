import { Accessory, DetailedAccessory, insertedAccessory } from '@tanglass-erp/core/product';
import { createAction, props } from '@ngrx/store';
import { RequireExactlyOne } from '@tanglass-erp/core/common';

/****************************************************************** */
/*****LOAD Accessories ** */
/****************************************************************** */

export const loadAccessories= createAction('[List accessories Component] Load Accessories');


export const loadAccessoriesSuccess = createAction(
  '[Accessory Effect] Load Accessories Success',
  props<{ accessories: Accessory[] }>()
);

export const loadAccessoriesFailure = createAction(
  '[Accessory Effect] Load Accessories Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL Accessory ** */
/****************************************************************** */

export const loadAccessoryById = createAction(
  '[Accessory Card Component] Load Accessory By Id',
  props<{ id: any }>()
  );


export const loadAccessoryByIdSuccess = createAction(
  '[Accessory Effect] Load Accessory By Id Success',
  props<{ accessory: DetailedAccessory }>()
);

export const loadAccessoryByIdFailure = createAction(
  '[Accessory Effect] Load Accessory By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL Accessory ** */
/****************************************************************** */

export const addAccessory = createAction(
  '[List accessories Component] Add Accessory',
  props<{ accessory: insertedAccessory }>()
);

export const addAccessorySuccess = createAction(
  '[Accessory Effect] Add Accessory Success',
  props<{ accessory: Accessory }>()
);

export const addAccessoryFailure = createAction(
  '[Accessory Effect] Add Accessory Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Accessory ** */
/****************************************************************** */

export const updateAccessory = createAction(
  '[List accessories Component] Update Accessory',
  props<{ accessory: RequireExactlyOne<insertedAccessory, 'id'> }>()
);
export const updateAccessorySuccess = createAction(
  '[Accessory Effect] Update Accessory Success',
  props<{ accessory: Accessory }>()
);
export const updateAccessoryFailure = createAction(
  '[Accessory Effect] Update Accessory failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL Accessory ** */
/****************************************************************** */

export const removeAccessory = createAction(
  '[List accessories Component] Delete Accessory',
  props<{ accessoryId: any }>()
);
export const removeAccessorySuccess = createAction(
  '[Accessory Effect] Delete Accessory Success',
  props<{ accessoryId: any }>()
);
export const removeAccessoryFailure = createAction(
  '[Accessory Effect] Delete Accessory failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE MANY Accessories ** */
/****************************************************************** */

export const removeAccessories = createAction(
  '[List accessories ] Delete Accessories',
  props<{ ids: string[] }>()
);
export const removeAccessoriesSuccess = createAction(
  '[Accessory ] Delete Accessories Success',
  props<{ids: string[]   }>()
);
export const removeAccessoriesFailure = createAction(
  '[Accessory ] Delete Accessories failure',
  props<{ error: any }>()
);

