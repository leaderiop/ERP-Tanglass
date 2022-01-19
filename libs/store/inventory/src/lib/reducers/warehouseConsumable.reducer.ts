import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ConsumableWarehouseActions from '../actions/warehouseConsumable.actions';
import { ConsumableWarehouse, SubstanceStocksDetails } from '@tanglass-erp/core/inventory';

export const CONSUMABLE_WAREHOUSE_FEATURE_KEY = 'consumable_warehouse';


export interface State extends EntityState<ConsumableWarehouse> {
  selectedWareHouse: SubstanceStocksDetails,
  loaded: boolean; // has the TransferOrder list been loaded
  error?: string | null; // last known error (if any)
}

export interface TransferOrderPartialState {
  readonly [CONSUMABLE_WAREHOUSE_FEATURE_KEY]: State;
}

export const ConsumableWarehouseAdapter: EntityAdapter<ConsumableWarehouse> = createEntityAdapter<
ConsumableWarehouse
>(
  // {
  //   selectId: (product: ConsumableWarehouse) => (
  //     product.substance.productConsumable.code, product.warehouse.id
  //   ),
  // }
);

export const initialState: State = ConsumableWarehouseAdapter.getInitialState({
  // set initial required properties
  selectedWareHouse: null,
  loaded: false,
  error: null,
});

const ConsumableWarehouseReducer = createReducer<State>(
  initialState,
  on( ConsumableWarehouseActions.loadConsumableWarehousesSuccess,
      (state, action)  => ConsumableWarehouseAdapter.setAll(action.consumableWarehouses,
        {
         ...state,
         loaded: true
        })
  ),
  on( ConsumableWarehouseActions.loadWareHouseConsumableByIdSuccess,
    (state, action)  => (
      {
       ...state,
       selectedWareHouse: action.consumableWarehouse,
      })
),
  on(ConsumableWarehouseActions.loadConsumableWarehousesFailure,
     ConsumableWarehouseActions.loadWareHouseConsumableByIdFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return ConsumableWarehouseReducer(state, action);
}
