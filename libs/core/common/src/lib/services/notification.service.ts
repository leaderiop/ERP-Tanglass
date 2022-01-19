import { Injectable } from '@angular/core';
import {
  ChangeNotificationStateGQL,
  NotificationQueryGQL,
  NotificationSubscriptionGQL
} from '@tanglass-erp/infrastructure/graphql';
import { InsertedErpNotificationStatus } from '../models/erp-notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private notificationQueryGQL: NotificationQueryGQL,
    private notificationSubscriptionGQL: NotificationSubscriptionGQL,
    private changeNotificationStateGQL: ChangeNotificationStateGQL
  ) {}

  loadNotifications(user_id: string, role) {
    const notificationSubscription$ = this.notificationQueryGQL
      .watch({user_id, role});

    notificationSubscription$.subscribeToMore({
        document: this.notificationSubscriptionGQL.document,
        variables: {
          user_id,
          role,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newFeedItem = subscriptionData.data;
          return { ...newFeedItem };
        },
      });
    return notificationSubscription$;
  }

  changeNotificationsState(states: InsertedErpNotificationStatus[]) {
    return this.changeNotificationStateGQL.mutate({ objects: states });
  }
}
