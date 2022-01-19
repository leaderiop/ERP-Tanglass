import { createAction, props } from '@ngrx/store';
import { ConsumableWarehouse, SubstanceStocksDetails } from '@tanglass-erp/core/inventory';

export const loadConsumableWarehouses = createAction('[ConsumableWarehouses] Load ConsumableWarehouses');

export const loadConsumableWarehousesSuccess = createAction(
  '[WareHouseConsumable effect] Load WareHouseConsumables Success',
  props<{ consumableWarehouses: ConsumableWarehouse[] }>()
);

export const loadConsumableWarehousesFailure = createAction(
  '[ConsumableWarehouses effect] Load ConsumableWarehouses Failure',
  props<{ error: any }>()
);


// load by id

export const loadWareHouseConsumableById = createAction(
  '[WareHouseConsumables component] Load WareHouseConsumable By Id',
  props<{ id: any }>()
  );

export const loadWareHouseConsumableByIdSuccess = createAction(
  '[WareHouseConsumables effect] Load WareHouseConsumable By Id Success',
  props<{ consumableWarehouse: SubstanceStocksDetails }>()
);

export const loadWareHouseConsumableByIdFailure = createAction(
  '[WareHouseConsumables effect] Load WareHouseConsumable By Id Failure',
  props<{ error: any }>()
);
