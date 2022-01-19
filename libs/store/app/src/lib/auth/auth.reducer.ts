import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { UserProfile } from '@tanglass-erp/core/common';

export const authFeatureKey = 'auth';

export interface State {
  user: UserProfile;
  token?:string;
  error: any;
}

export const initialState: State = {
  user: null,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      token:action.token,
      error: null,
    };
  }),
  on(AuthActions.loadUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
