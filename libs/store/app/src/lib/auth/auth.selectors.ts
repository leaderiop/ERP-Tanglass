import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey, State } from './auth.reducer';


export const getAuthState = createFeatureSelector<
  State
  >(authFeatureKey);


export const getUser = createSelector(
  getAuthState,
  (state: State) => state.user
);
