import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as StockAdjustmentsActions from '../actions/stock-adjustments.actions';
import { Adjustment as StockAdjustmentsEntity, SubstanceWarehouse } from '@tanglass-erp/core/inventory';

export const STOCKADJUSTMENTS_FEATURE_KEY = 'stockAdjustments';

export interface State extends EntityState<StockAdjustmentsEntity> {
  selectedId?: string | number; // which StockAdjustments record has been selected
  stockInHand?:SubstanceWarehouse[];
  loaded: boolean; // has the StockAdjustments list been loaded
  error?: string | null; // last known error (if any)
}

export interface StockAdjustmentsPartialState {
  readonly [STOCKADJUSTMENTS_FEATURE_KEY]: State;
}

export const stockAdjustmentsAdapter: EntityAdapter<StockAdjustmentsEntity> = createEntityAdapter<
  StockAdjustmentsEntity
>();

export const initialState: State = stockAdjustmentsAdapter.getInitialState({
  // set initial required properties
  stockInHand:[],
  loaded: false,
});

const stockAdjustmentsReducer = createReducer(
  initialState,
  on(StockAdjustmentsActions.loadStockAdjustments, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    StockAdjustmentsActions.loadStockAdjustmentsSuccess,
    (state, { stockAdjustments }) =>
      stockAdjustmentsAdapter.setAll(stockAdjustments, {
        ...state,
        loaded: true,
      })
  ),
  on(
    StockAdjustmentsActions.loadStockInHandSuccess,
    (state, { StockInHand }) =>
    ({
      ...state,
      error: null,
      stockInHand: StockInHand,
    })
  ),
  on(
    StockAdjustmentsActions.addAdjustmentSuccess,
    (state, action) => stockAdjustmentsAdapter.addOne(action.adjustment, state)
  ),
  on(
    StockAdjustmentsActions.loadStockAdjustmentsFailure,
    StockAdjustmentsActions.addAdjustmentFailure,
    StockAdjustmentsActions.loadStockInHandFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return stockAdjustmentsReducer(state, action);
}
