import { createAction, props } from '@ngrx/store';
import { AccessoryWarehouse, SubstanceStocksDetails } from '@tanglass-erp/core/inventory';

export const loadWareHouseAccessories = createAction('[WareHouseAccessories component] Load WareHouseAccessories');

export const loadWareHouseAccessoriesSuccess = createAction(
  '[WareHouseAccessories effect] Load WareHouseAccessories Success',
  props<{ wareHouseAccessories: AccessoryWarehouse[] }>()
);

export const loadWareHouseAccessoriesFailure = createAction(
  '[WareHouseAccessories effect] Load WareHouseAccessories Failure',
  props<{ error: any }>()
);


// load by id

export const loadWareHouseAccessorieById = createAction(
  '[WareHouseAccessories component] Load WareHouseAccessorie By Id',
  props<{ id: any }>()
  );

export const loadWareHouseAccessorieByIdSuccess = createAction(
  '[WareHouseAccessories effect] Load WareHouseAccessorie By Id Success',
  props<{ accessoryWarehouse: SubstanceStocksDetails }>()
);

export const loadWareHouseAccessorieByIdFailure = createAction(
  '[WareHouseAccessories effect] Load WareHouseAccessorie By Id Failure',
  props<{ error: any }>()
);


