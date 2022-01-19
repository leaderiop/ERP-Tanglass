import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { Action, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  currentUser$ = this.store.select(AuthSelectors.getUser);
  currentUser;
  currentAuthToken
  constructor(private store: Store) {
    // this.loadUser();
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadUser() {
    this.dispatch(AuthActions.loadUser());
  }

}
