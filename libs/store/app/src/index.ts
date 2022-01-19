import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './lib/auth/auth.reducer';
import * as fromNotif from './lib/notification/notification.reducer';
import { rolesDirection } from '@tanglass-erp/core/management';

export interface AppState {
  [fromAuth.authFeatureKey]: fromAuth.State,
  [fromNotif.notificationFeatureKey]: fromNotif.NotificationState
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromNotif.notificationFeatureKey]: fromNotif.reducer
};



export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return reducer(state, action);
  };
}
export *  from './lib/notification/notification.actions';
export *  from './lib/notification/notification.selectors';
export *  from './lib/notification/notification.model';
export *  from './lib/notification/notification-facade.service';
export * from './lib/auth/auth-facade.service';
export * from './lib/store-app.module';
export {rolesDirection as ROLES} from '@tanglass-erp/core/management';
