import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as NotifActions from './notification.actions';
import { MNotification } from './notification.model';

export const notificationFeatureKey = 'notifications';

export interface NotificationState extends EntityState<MNotification> {
  loaded: boolean; // has the Service list been loaded
  error?: string | null; // last known error (if any)
}

export interface NotificationPartialState {
  readonly [notificationFeatureKey]: NotificationState;
}

export const notificationsAdapter: EntityAdapter<MNotification> = createEntityAdapter<
  MNotification
>();

export const initialState: NotificationState = notificationsAdapter.getInitialState(
  {
    entities: [],
    ids: [],
    loaded: false,
    error: null,
  }
);

export const reducer = createReducer(
  initialState,

  on(NotifActions.loadNotificationsSuccess, (state, action) =>
    notificationsAdapter.setAll(action.notifications, {
      ...state,
      loaded: true,
    })
  ),
  on(NotifActions.AddNotification, (state, action) =>
    notificationsAdapter.addOne(
      {
        id: null,
        time: new Date(),
        color: 'primary',
        icon: 'checked',
        ...action.notification,
      },
      state
    )
  ),
  on(NotifActions.clearNotification, (state) =>
    notificationsAdapter.removeAll(state)
  ),
  on(
    NotifActions.loadNotificationsFailure,
    NotifActions.AddNotificationFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  )
);
