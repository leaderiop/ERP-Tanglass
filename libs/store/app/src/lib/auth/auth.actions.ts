import { createAction, props } from '@ngrx/store';
import { UserProfile } from '@tanglass-erp/core/common';


export const loadUser = createAction(
  '[Login Modal Component] Load User',
);

export const loadUserSuccess = createAction(
  '[Auth Effect] Load User Success',
  props<{ user: UserProfile,token:string }>()
);

export const loadUserFailure = createAction(
  '[Auth Effect] Load User Failure',
  props<{ error: any }>()
);
