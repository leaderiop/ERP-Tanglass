import { Consumable, DetailedConsumable, InsertedConsumable } from '@tanglass-erp/core/product';
import { createAction, props } from '@ngrx/store';
import { RequireExactlyOne } from '@tanglass-erp/core/common';

/****************************************************************** */
/*****LOAD ConsumableS ** */
/****************************************************************** */

export const loadConsumables= createAction('[List Consumables Component] Load Consumables');


export const loadConsumablesSuccess = createAction(
  '[Consumable Effect] Load Consumables Success',
  props<{ consumables: Consumable[] }>()
);

export const loadConsumablesFailure = createAction(
  '[Consumable Effect] Load Consumables Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL Consumable ** */
/****************************************************************** */

export const loadConsumableById = createAction(
  '[Consumable Card Component] Load Consumable By Id',
  props<{ id: any }>()
  );


export const loadConsumableByIdSuccess = createAction(
  '[Consumable Effect] Load Consumable By Id Success',
  props<{ consumable: DetailedConsumable }>()
);

export const loadConsumableByIdFailure = createAction(
  '[Consumable Effect] Load Consumable By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL Consumable ** */
/****************************************************************** */

export const addConsumable = createAction(
  '[List Consumable Component] Add Consumable',
  props<{ consumable: InsertedConsumable }>()
);

export const addConsumableSuccess = createAction(
  '[Consumable Effect] Add Consumable Success',
  props<{ consumable: Consumable }>()
);

export const addConsumableFailure = createAction(
  '[Consumable Effect] Add Consumable Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Consumable ** */
/****************************************************************** */

export const updateConsumable = createAction(
  '[List Consumable Component] Update Consumable',
  props<{ consumable: RequireExactlyOne<InsertedConsumable, 'id'> }>()
);
export const updateConsumableSuccess = createAction(
  '[Consumable Effect] Update Consumable Success',
  props<{ consumable: Consumable }>()
);
export const updateConsumableFailure = createAction(
  '[Consumable Effect] Update Consumable failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL Consumable ** */
/****************************************************************** */

export const removeConsumable = createAction(
  '[List Consumable Component] Delete Consumable',
  props<{ consumableId: any }>()
);
export const removeConsumableSuccess = createAction(
  '[Consumable Effect] Delete Consumable Success',
  props<{ consumableId: any }>()
);
export const removeConsumableFailure = createAction(
  '[Consumable Effect] Delete Consumable failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE MANY Consumables ** */
/****************************************************************** */

export const removeConsumables = createAction(
  '[List Consumables ] Delete Consumables',
  props<{ ids: string[] }>()
);
export const removeConsumablesSuccess = createAction(
  '[Consumables ] Delete Consumables Success',
  props<{ ids:string[]}>()
);
export const removeConsumablesFailure = createAction(
  '[Consumables ] Delete Consumables failure',
  props<{ error: any }>()
);
