import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  notificationFeatureKey,
  NotificationPartialState,
  notificationsAdapter,
  NotificationState
} from './notification.reducer';

// Lookup the 'TransferOrders' feature state managed by NgRx
export const getNotificationState = createFeatureSelector<
  NotificationPartialState,
  NotificationState
>(notificationFeatureKey);

const { selectAll, selectEntities } = notificationsAdapter.getSelectors();


const getNotificationEntities = createSelector(
  getNotificationState, (state: NotificationState) => selectEntities(state)
);



export const getNotificationError = createSelector(
  getNotificationState,
  (state: NotificationState) => state.error
);


export const getAllNotifications = createSelector(
  getNotificationState,
  (state: NotificationState) => selectAll(state)
);
