import { createAction, props } from '@ngrx/store';
import { GlassWarehouse, SubstanceStocksDetails } from '@tanglass-erp/core/inventory';

export const loadGlassWarehouses = createAction('[GlassWarehouses] Load GlassWarehouses');

export const loadGlassWarehousesSuccess = createAction(
  '[WareHouseGlasses] Load WareHouseGlasses Success',
  props<{ glassWarehouses: GlassWarehouse[] }>()
);

export const loadGlassWarehousesFailure = createAction(
  '[GlassWarehouses] Load GlassWarehouses Failure',
  props<{ error: any }>()
);


// load by id

export const loadWareHouseGlassById = createAction(
  '[WareHouseGlasss component] Load WareHouseGlass By Id',
  props<{ id: any }>()
  );

export const loadWareHouseGlassByIdSuccess = createAction(
  '[WareHouseGlasss effect] Load WareHouseGlass By Id Success',
  props<{ glassWarehouse: SubstanceStocksDetails }>()
);

export const loadWareHouseGlassByIdFailure = createAction(
  '[WareHouseGlasss effect] Load WareHouseGlass By Id Failure',
  props<{ error: any }>()
);
