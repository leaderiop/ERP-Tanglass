import { DetailedGlass, Glass, InsertedGlass } from '@tanglass-erp/core/product';
import { createAction, props } from '@ngrx/store';
import { RequireExactlyOne } from '@tanglass-erp/core/common';

/****************************************************************** */
/*****LOAD Glasses ** */
/****************************************************************** */

export const loadGlasses= createAction('[List Glasses Component] Load Glasses');


export const loadGlassesSuccess = createAction(
  '[Glass Effect] Load Glasses Success',
  props<{ glasses: Glass[] }>()
);

export const loadGlassesFailure = createAction(
  '[Glass Effect] Load Glasses Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL Glass ** */
/****************************************************************** */

export const loadGlassById = createAction(
  '[Glass Card Component] Load Glass By Id',
  props<{ id: any }>()
  );


export const loadGlassByIdSuccess = createAction(
  '[Glass Effect] Load Glass By Id Success',
  props<{ glass: DetailedGlass }>()
);

export const loadGlassByIdFailure = createAction(
  '[Glass Effect] Load Glass By Id Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****ADD INDIVIDUAL Glass ** */
/****************************************************************** */

export const addGlass = createAction(
  '[List Glasses Component] Add Glass',
  props<{ glass: InsertedGlass }>()
);

export const addGlassSuccess = createAction(
  '[Glass Effect] Add Glass Success',
  props<{ glass: Glass }>()
);

export const addGlassFailure = createAction(
  '[Glass Effect] Add Glass Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL Glass ** */
/****************************************************************** */

export const updateGlass = createAction(
  '[List Glasses Component] Update Glass',
  props<{ glass: RequireExactlyOne<InsertedGlass, 'id'> }>()
);
export const updateGlassesuccess = createAction(
  '[Glass Effect] Update Glass Success',
  props<{ glass: Glass }>()
);
export const updateGlassFailure = createAction(
  '[Glass Effect] Update Glass failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL Glass ** */
/****************************************************************** */

export const removeGlass = createAction(
  '[List Glasses Component] Delete Glass',
  props<{ glassId: any }>()
);
export const removeGlassesuccess = createAction(
  '[Glass Effect] Delete Glass Success',
  props<{ glassId: any }>()
);
export const removeGlassFailure = createAction(
  '[Glass Effect] Delete Glass failure',
  props<{ error: any }>()
);


//

export const loadTypes = createAction(
  '[List Glasses Component] Load types of Glass'
);
export const loadTypesSuccess = createAction(
  '[Glass Effect] Load types of Glass Success',
  props<{ types: string[] }>()
);
export const loadTypesFailure = createAction(
  '[Glass Effect] Load types of Glass failure',
  props<{ error: any }>()
);

//

export const loadColors = createAction(
  '[List Glasses Component] Load colors of Glass'
);
export const loadColorsSuccess = createAction(
  '[Glass Effect] Load colors of Glass Success',
  props<{ colors: string[] }>()
);
export const loadColorsFailure = createAction(
  '[Glass Effect] Load colors of Glass failure',
  props<{ error: any }>()
);



/****************************************************************** */
/*****REMOVE MANY Glasses ** */
/****************************************************************** */

export const removeGlasses = createAction(
  '[List Glasses ] Delete Glasses',
  props<{ ids: string[] }>()
);
export const removeGlassesSuccess = createAction(
  '[Glasses ] Delete Glasses Success',
  props<{ ids: string[]}>()
);
export const removeGlassesFailure = createAction(
  '[Glasses ] Delete Glasses failure',
  props<{ error: any }>()
);

