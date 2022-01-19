import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InsertedErpNotificationStatus, NotificationPriority, NotificationService } from '@tanglass-erp/core/common';
import * as NotificationActions from '../notification/notification.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class NotificationEffects {
  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.loadNotifications),
      mergeMap((action) => {
        const subscription$ = this.notificationService.loadNotifications(
          action.user_id,
          action.role
        );
        return subscription$.valueChanges.pipe(
          map((res) =>
            NotificationActions.loadNotificationsSuccess({
              notifications: res.data.notification_notification
                .filter(
                  (e) =>
                    !e.notification_status.length ||
                    !e.notification_status[0].hide
                )
                .map((notification) => ({
                  id: notification.id,
                  icon: {
                    [NotificationPriority.HIGH]: 'priority_high',
                    [NotificationPriority.MEDIUM]: 'check',
                    [NotificationPriority.LOW]: 'low_priority',
                  }[notification.priority],
                  operation: 'success',
                  route: notification.route,
                  time: notification.createdAt,
                  title: notification.title,
                  message: notification.message,
                  color: {
                    [NotificationPriority.HIGH]: 'warn',
                    [NotificationPriority.MEDIUM]: 'primary',
                    [NotificationPriority.LOW]: 'accent',
                  }[notification.priority],
                  read: notification.notification_status.length
                    ? notification.notification_status[0].read
                    : false,
                })),
            })
          )
        );
      }),
      catchError((error) =>
        of(NotificationActions.loadNotificationsFailure({ error }))
      )
    )
  );

  changeNotificationsState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.changeNotificationsState),
      mergeMap((action) =>
        this.notificationService
          .changeNotificationsState(
            action.ids.map(
              (id) =>
                ({
                  notification_id: id,
                  user_id: action.user_id,
                  hide: action.hide,
                  read: true,
                } as InsertedErpNotificationStatus)
            )
          )
          .pipe(
            map(() => NotificationActions.changeNotificationsStateSuccess())
          )
      ),
      catchError((error) =>
        of(NotificationActions.changeNotificationsStateFailure({ error }))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}
}
