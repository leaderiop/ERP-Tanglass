import { DetailedUser, InsertedUser, User } from '@tanglass-erp/core/management';
import { createAction, props } from '@ngrx/store';

/****************************************************************** */
/*****LOAD USERS ** */
/****************************************************************** */

export const loadUsers= createAction('[Users Component] Load Users');


export const loadUsersSuccess = createAction(
  '[User Effect] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User Effect] Load Users Failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****LOAD INDIVIDUAL User ** */
/****************************************************************** */

export const loadUserById = createAction(
  '[User Card Component] Load User By Id',
  props<{ id: any }>()
  );


export const loadUserByIdSuccess = createAction(
  '[User Effect] Load User By Id Success',
  props<{ user: DetailedUser }>()
);

export const loadUserByIdFailure = createAction(
  '[User Effect] Load User By Id Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****ADD INDIVIDUAL USER ** */
/****************************************************************** */

export const addUser = createAction(
  '[Pop Users Component] Add User',
  props<{ user: InsertedUser }>()
);

export const addUserSuccess = createAction(
  '[User Effect] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[User Effect] Add User Failure',
  props<{ error: any }>()
);

/****************************************************************** */
/*****UPDATE INDIVIDUAL USER ** */
/****************************************************************** */

export const updateUser = createAction(
  '[Pop Users Component] Update User',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[User Effect] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[User Effect] Update User failure',
  props<{ error: any }>()
);


/****************************************************************** */
/*****REMOVE INDIVIDUAL User ** */
/****************************************************************** */

export const removeUser = createAction(
  '[Users Component] Delete User',
  props<{ userId: any }>()
);
export const removeUserSuccess = createAction(
  '[User Effect] Delete User Success',
  props<{ userId: any }>()
);
export const removeUserFailure = createAction(
  '[User Effect] Delete User failure',
  props<{ error: any }>()
);
