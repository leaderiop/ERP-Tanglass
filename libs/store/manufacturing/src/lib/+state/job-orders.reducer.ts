import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as JobOrdersActions from './job-orders.actions';
import { JobOrder, JobProduct } from '@tanglass-erp/core/manufacturing';
import {
  GlassesUpdating,
  JobOrderGlassesAdapter,
} from './adapters/job-orders.adapters';

export const JOB_ORDERS_FEATURE_KEY = 'jobOrders';

export interface State extends EntityState<JobOrder> {
  selectedId?: string | number; // which JobOrders record has been selected
  selectedJobOrder?: JobOrder;
  selectedGlasses?: JobProduct[];
  selectedGlass?: JobProduct;
  withBarCodes: boolean;
  loaded: boolean; // has the JobOrders list been loaded
  error?: string | null; // last known error (if any)
}

export interface JobOrdersPartialState {
  readonly [JOB_ORDERS_FEATURE_KEY]: State;
}

export const jobOrdersAdapter: EntityAdapter<JobOrder> = createEntityAdapter<
  JobOrder
>();

export const initialState: State = jobOrdersAdapter.getInitialState({
  // set initial required properties
  withBarCodes: true,
  loaded: false,
});

const jobOrdersReducer = createReducer(
  initialState,
  on(JobOrdersActions.loadJobOrders, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(JobOrdersActions.loadJobOrdersSuccess, (state, { jobOrders }) =>
    jobOrdersAdapter.setAll(jobOrders, { ...state, loaded: true })
  ),
  on(JobOrdersActions.addJobOrderSuccess, (state, action) =>
    jobOrdersAdapter.addOne(action.jobOrder, state)
  ),
  on(JobOrdersActions.selectGlassLine, (state, action) => ({
    ...state,
    selectedGlass: action.glass,
    loaded: true,
    error: null,
  })),
  on(JobOrdersActions.updateLinesStatesSuccess, (state, action) => ({
    ...state,
    selectedGlasses: GlassesUpdating(
      state.selectedGlasses,
      state.selectedGlass,
      action.lines
    ),
    loaded: true,
    error: null,
  })),

  on(JobOrdersActions.updateGlassLine, (state, action) => ({
    ...state,
    selectedGlass: action.glass,
    loaded: true,
    error: null,
  })),
  on(JobOrdersActions.loadJobOrderByIdSuccess, (state, action) => ({
    ...state,
    error: null,
    withBarCodes: action.jobOrder.glass_drafts[0]?.manufacturing_lines.length
      ? true
      : false,
    selectedJobOrder: action.jobOrder,
    selectedGlasses: JobOrderGlassesAdapter(action.jobOrder.glass_drafts),
  })),
  on(JobOrdersActions.addManufacturingLinesSuccess, (state, action) => {
    return {
      ...state,
      error: null,
      withBarCodes: true,
      selectedGlasses: JobOrderGlassesAdapter([
        ...state.selectedJobOrder.glass_drafts.map((glass) => ({
          ...glass,
          manufacturing_lines: action.manufacturingLines.filter(
            (line) => line.glass_id === glass.id
          ),
        })),
      ]),
    };
  }),

  on(
    JobOrdersActions.loadJobOrdersFailure,
    JobOrdersActions.addJobOrderFailure,
    JobOrdersActions.addManufacturingLinesFailure,
    JobOrdersActions.loadJobOrderByIdFailure,
    JobOrdersActions.updateLinesStatesFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return jobOrdersReducer(state, action);
}
