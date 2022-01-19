import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '@tanglass-erp/core/management';

import { State, USER_FEATURE_KEY, userAdapter } from '../reducers/users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<
  State
>(USER_FEATURE_KEY);

const { selectAll, selectEntities } = userAdapter.getSelectors();

export const getUsersLoaded = createSelector(
  getUsersState,
  (state: State) => state.loaded
);

export const getUsersError = createSelector(
  getUsersState,
  (state: State) => state.error
);

export const getAllUsers = createSelector(
  getUsersState,
  (state: State) => selectAll(state)
);

export const getUsersEntities = createSelector(
  getUsersState,
  (state: State) => selectEntities(state)
);

export const getSelectedUser = createSelector(
  getUsersState,
  (state: State) => state.selectedUser
);

/********************************************************************************* */
/****RETURN USERS VIEW MODEL */
/********************************************************************************* */

export interface UsersViewModel {
  users: User[];
}

export const selectUsersViewModel = createSelector(
  getAllUsers,
  (
    users: User[]
  ): UsersViewModel => {
    return {
      users: users,
    };
  }
);
