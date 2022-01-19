import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as DraftActions from './draft.actions';
import { Draft } from '@tanglass-erp/core/sales';

export const DRAFT_FEATURE_KEY = 'draft';

export interface DraftState extends EntityState<Draft> {
  selectedId: number; // which Draft record has been selected
  draftLoadedById?: Draft;
  copieDraft_id?: number; //for transforming a quotation into order ( create other draft )
  loaded: boolean; // has the Draft list been loaded
  error?: string | null; // last known error (if any)
}

export interface DraftPartialState {
  readonly [DRAFT_FEATURE_KEY]: DraftState;
}

export const draftAdapter: EntityAdapter<Draft> = createEntityAdapter<Draft>();

export const initialDraftState: DraftState = draftAdapter.getInitialState({
  // set initial required properties
  selectedId: null,
  copieDraft_id:null,
  loaded: false,
});

const draftReducer = createReducer(
  initialDraftState,
  on(DraftActions.loadDrafts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DraftActions.loadDraftSuccess, (state, { draft }) =>
    draftAdapter.setAll(draft, { ...state, loaded: true })
  ),
  on(DraftActions.addDraftSuccess, (state, action) =>
    draftAdapter.addOne(action.draft, { ...state, selectedId: action.draft.id })
  ),
  on(DraftActions.loadDraftById, (state) => ({
    ...state,
    draftLoadedById: null,
  })),
  on(DraftActions.loadDraftByIdSuccess, (state, { draft }) => ({
    ...state,
    draftLoadedById: draft,
  })),
  on(DraftActions.removeDraftSuccess, (state, action) =>
    draftAdapter.removeMany(action.ids, state)
  ),

  on(DraftActions.selectDraft, (state, action) => ({
    ...state,
    selectedId: action.id,
  })),
  on(DraftActions.clearDraftState, (state) =>
    draftAdapter.removeAll(initialDraftState)
  ),
  on(DraftActions.copierDraftSuccess, (state, action) =>
    draftAdapter.addOne(action.draft, {
      ...state,
      copieDraft_id: action.draft.id,
    })
  ),
  on(
    DraftActions.loadDraftFailure,
    DraftActions.addDraftFailure,
    DraftActions.loadDraftByIdFailure,
    DraftActions.copierDraftFailure,

    (state, { error }) => ({ ...state, error })
  )
);

export function reducerDraft(state: DraftState | undefined, action: Action) {
  return draftReducer(state, action);
}
