import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as UserActions from '../actions/user.actions';
import { DetailedUser, User } from '@tanglass-erp/core/management';

export const USER_FEATURE_KEY = 'users';

export interface State extends EntityState<User> {
  selectedUser: DetailedUser
  loaded: boolean; // has the Companie list been loaded
  error?: string | null; // last known error (if any)
}


export const userAdapter: EntityAdapter<User> = createEntityAdapter<
User
>();

export const initialState: State = userAdapter.getInitialState({
  // set initial required properties
  selectedUser: null,
  loaded: false,
  error: null,
});

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserByIdSuccess, (state, action) => ({
    ...state,
    selectedUser: action.user,
    error: null
  })),
  on(UserActions.loadUsersSuccess,
      (state, action) =>
        userAdapter.setAll(action.users, { ...state, loaded: true })
  ),
  on(UserActions.addUserSuccess,
    (state, action) => userAdapter.addOne(action.user, state)
  ),
  on(UserActions.updateUserSuccess, (state, action) =>
    userAdapter.upsertOne(action.user, state)
  ),
  on(UserActions.removeUserSuccess, (state, action) =>
    userAdapter.removeOne(action.userId, state)
  ),
  on(UserActions.addUserFailure,
     UserActions.loadUsersFailure,
     UserActions.updateUserFailure,
     UserActions.loadUserByIdFailure,
     UserActions.removeUserFailure,
     (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}
