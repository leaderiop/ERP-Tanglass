import { DetailedSalePoint, SalePoint } from '@tanglass-erp/core/management';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD SALEPOINTS ** */
/****************************************************************** */

export const loadSalePoints= createAction('[SalePoints Component] Load SalePoints');


export const loadSalePointsSuccess = createAction(
  '[SalePoint Effect] Load SalePoints Success',
  props<{ salePoints: SalePoint[] }>()
);

export const loadSalePointsFailure = createAction(
  '[SalePoint Effect] Load SalePoints Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL SalePoint ** */
/****************************************************************** */

export const loadSalePointById = createAction(
  '[SalePoint Card Component] Load SalePoint By Id',
  props<{ id: any }>()
  );


export const loadSalePointByIdSuccess = createAction(
  '[SalePoint Effect] Load SalePoint By Id Success',
  props<{ salePoint: DetailedSalePoint }>()
);

export const loadSalePointByIdFailure = createAction(
  '[SalePoint Effect] Load SalePoint By Id Failure',
  props<{ error: any }>()
);



/****************************************************************** */
/*****ADD INDIVIDUAL SALEPOINT ** */
/****************************************************************** */

export const addSalePoint = createAction(
  '[Pop SalePoints Component] Add SalePoint',
  props<{ salePoint: SalePoint }>()
);

export const addSalePointSuccess = createAction(
  '[SalePoint Effect] Add SalePoint Success',
  props<{ salePoint: SalePoint }>()
);

export const addSalePointFailure = createAction(
  '[SalePoint Effect] Add SalePoint Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL SALEPOINT ** */
/****************************************************************** */

export const updateSalePoint = createAction(
  '[Pop SalePoints Component] Update SalePoint',
  props<{ salePoint: SalePoint }>()
);
export const updateSalePointSuccess = createAction(
  '[SalePoint Effect] Update SalePoint Success',
  props<{ salePoint: SalePoint }>()
);
export const updateSalePointFailure = createAction(
  '[SalePoint Effect] Update SalePoint failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****REMOVE INDIVIDUAL SalePoint ** */
/****************************************************************** */

export const removeSalePoint = createAction(
  '[SalePoints Component] Delete SalePoint',
  props<{ salePointId: any }>()
);
export const removeSalePointSuccess = createAction(
  '[SalePoint Effect] Delete SalePoint Success',
  props<{ salePointId: any }>()
);
export const removeSalePointFailure = createAction(
  '[SalePoint Effect] Delete SalePoint failure',
  props<{ error: any }>()
);
