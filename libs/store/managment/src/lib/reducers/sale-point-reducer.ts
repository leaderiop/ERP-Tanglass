import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as SalePointActions from '../actions/salePoint.actions';
import { DetailedSalePoint, SalePoint } from '@tanglass-erp/core/management';

export const SALE_POINT_FEATURE_KEY = 'sale-points';

export interface State extends EntityState<SalePoint> {
  selectedSalePoint: DetailedSalePoint,
  loaded: boolean; // has the Companie list been loaded
  error?: string | null; // last known error (if any)
}


export const salePointAdapter: EntityAdapter<SalePoint> = createEntityAdapter<
SalePoint
>();

export const initialState: State = salePointAdapter.getInitialState({
  // set initial required properties
  selectedSalePoint: null,
  loaded: false,
  error: null,
});

const salePointReducer = createReducer(
  initialState,
  on(SalePointActions.loadSalePointByIdSuccess, (state, action) => ({
    ...state,
    selectedSalePoint: action.salePoint,
    error: null,
  })),
  on(SalePointActions.loadSalePointById, (state, action) => ({
    ...state,
    selectedSalePoint: null,
    error: null,
  })),
  on(SalePointActions.loadSalePointsSuccess,
     (state, action) =>
  salePointAdapter.setAll(action.salePoints, { ...state, loaded: true })
  ),
  on(SalePointActions.addSalePointSuccess,
    (state, action) => salePointAdapter.addOne(action.salePoint, state)
  ),
  on(SalePointActions.updateSalePointSuccess, (state, action) =>
  salePointAdapter.upsertOne(action.salePoint, state)
  ),
  on(SalePointActions.removeSalePointSuccess, (state, action) =>
  salePointAdapter.removeOne(action.salePointId, state)
  ),
  on(SalePointActions.addSalePointFailure,
     SalePointActions.loadSalePointsFailure,
     SalePointActions.updateSalePointFailure,
     SalePointActions.loadSalePointByIdFailure,
     SalePointActions.removeSalePointFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return salePointReducer(state, action);
}

