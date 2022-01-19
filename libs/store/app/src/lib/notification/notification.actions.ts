import { createAction, props } from '@ngrx/store';
import { MNotification } from './notification.model';


export const loadNotifications = createAction(
  '[Notification Component] Load Notifications',
  props<{user_id: string, role}>()
);
export const loadNotificationsSuccess = createAction(
  '[Alert effect] Load Notifications Succces',
  props<{notifications: MNotification[]}>()
);
export const loadNotificationsFailure = createAction(
  '[Alert effect] Load Notifications Failure',
  props<{error: any}>()
);

export const changeNotificationsState = createAction(
  '[Notification Component] change Notifications State',
  props<{ids: string[], user_id: string, hide: boolean}>()
);
export const changeNotificationsStateSuccess = createAction(
  '[Notification Component] change Notifications State Succces',
);
export const changeNotificationsStateFailure = createAction(
  '[Notification Component] change Notifications State Failure',
  props<{error: any}>()
);


export const clearNotification = createAction(
  '[Alert effect] Clear Notifications',
);


export const AddNotification = createAction(
  '[Notification Component] Add Notification',
  props<{notification: MNotification}>()
);
export const AddNotificationSuccess = createAction(
  '[Alert Component] Add Notification success',
  props<{notification: MNotification}>()
);
export const AddNotificationFailure = createAction(
  '[Alert Component] Add Notification Failure',
  props<{error: any}>()
);
