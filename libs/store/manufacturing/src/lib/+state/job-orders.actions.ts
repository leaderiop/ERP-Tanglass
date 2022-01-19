import { createAction, props } from '@ngrx/store';
import {
  InsertedJobOrder,
  InsertedManufacturingLine,
  InsertedManufacturingState,
  JobOrder,
  JobProduct,
  ManufacturingLine,
  ManufacturingState
} from '@tanglass-erp/core/manufacturing';

/****************************************************************** */
/*****LOAD ALL JOB ORDERS ** */
/****************************************************************** */

export const loadJobOrders = createAction('[JobOrders] Load JobOrders');

export const loadJobOrdersSuccess = createAction(
  '[JobOrders] Load JobOrders Success',
  props<{ jobOrders: JobOrder[] }>()
);

export const loadJobOrdersFailure = createAction(
  '[JobOrders] Load JobOrders Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****LOAD INDIVIDUAL JOB ORDER ** */
/****************************************************************** */

export const loadJobOrderById = createAction(
  '[JOB Order Component] Load Job Order By Id',
  props<{ id: number }>()
);

export const loadJobOrderByIdSuccess = createAction(
  '[Job Order Effect] Load Job Order By Id Success',
  props<{ jobOrder: JobOrder }>()
);

export const loadJobOrderByIdFailure = createAction(
  '[Job Order Effect] Load Job Order By Id Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD INDIVIDUAL JOB ORDER ** */
/****************************************************************** */

export const addJobOrder = createAction(
  '[Job Orders Component] Add Job Order',
  props<{ jobOrder: InsertedJobOrder }>()
);

export const addJobOrderSuccess = createAction(
  '[Job Order Effect] Add Job Order Success',
  props<{ jobOrder: JobOrder }>()
);

export const addJobOrderFailure = createAction(
  '[Job Order Effect] Add Job Order Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD MANUFACTURING LINES  ** */
/****************************************************************** */

export const addManufacturingLines = createAction(
  '[ Manufacturing Lines] Add Manufacturing Lines',
  props<{ manufacturingLines: InsertedManufacturingLine[] }>()
);

export const addManufacturingLinesSuccess = createAction(
  '[Manufacturing Lines Effect] Add Manufacturing Lines Success',
  props<{ manufacturingLines: ManufacturingLine[] }>()
);

export const addManufacturingLinesFailure = createAction(
  '[Manufacturing Lines Effect] Add Manufacturing Lines Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE MANUFACTURING LINES  STATES** */
/****************************************************************** */

export const updateLinesStates = createAction(
  '[ Manufacturing States] Update Manufacturing Progress Lines',
  props<{ lines: InsertedManufacturingState }>()
);

export const updateLinesStatesSuccess = createAction(
  '[ Manufacturing States Effect] Update Manufacturing Progress Lines Success',
  props<{ lines: ManufacturingState }>()
);

export const updateLinesStatesFailure = createAction(
  '[ Manufacturing States Effect] Update Manufacturing Lines Progress Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****SELECT GLASS  LINE  ** */
/****************************************************************** */

export const selectGlassLine = createAction(
  '[ Manufacturing Glass Line States] Select Manufacturing Glass Line States ',
  props<{ glass: JobProduct }>()
);



/****************************************************************** */
/*****UPDATE SELECTED GLASSLINE  ** */
/****************************************************************** */

export const updateGlassLine = createAction(
  '[ Manufacturing Glass Line States] Update Manufacturing Glass Line States ',
  props<{ glass: JobProduct }>()
);
