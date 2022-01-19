import { UserService } from '@tanglass-erp/core/management';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UsersActions from '../actions/user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap( () =>
        this.userService.getAll().pipe(
          map((data) =>
          UsersActions.loadUsersSuccess({users: data.data.management_userProfile})
          ),
          catchError((error) =>
            of(UsersActions.loadUsersFailure({ error }))
          )
        )
      )
    )
  });




  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUser),
      mergeMap((action) =>
        this.userService.insertOne(action.user).pipe(
          map((data) =>
          UsersActions.addUserSuccess({user: data.data.SignUp})
          ),
          catchError((error) =>
            of(UsersActions.addUserFailure({ error }))
          )
        )
      )
    )
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUserById),
      mergeMap((action) =>
        this.userService.getOneById(action.id).pipe(
          map((data) =>
          UsersActions.loadUserByIdSuccess({user: data.data.management_userProfile_by_pk})
          ),
          catchError((error) =>
            of(UsersActions.loadUserByIdFailure({ error }))
          )
        )
      )
    )
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap((action) =>
        this.userService.updateOne(action.user).pipe(
          map((data) =>
          UsersActions.updateUserSuccess({user: data.data.update_management_userProfile_by_pk})
          ),
          catchError((error) =>
            of(UsersActions.updateUserFailure({ error }))
          )
        )
      )
    )
  });

  removeUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.removeUser),
      mergeMap((action) =>
        this.userService.removeOne(action.userId).pipe(
          map((data) =>
          UsersActions.removeUserSuccess({userId: data.data.delete_management_userProfile_by_pk.id})
          ),
          catchError((error) =>
            of(UsersActions.removeUserFailure({ error }))
          )
        )
      )
    )
  });


  constructor(private actions$: Actions,
              private userService: UserService) {}
}
