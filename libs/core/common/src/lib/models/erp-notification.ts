import { MetaData } from '../..';
import { rolesDirection } from '@tanglass-erp/core/management';
import { NotificationPriority } from '../enums';

export interface ErpNotification extends MetaData {
  id?: string;
  title: string;
  message: string;
  role?: rolesDirection;
  route?: string;
  user_id?: string;
  priority: NotificationPriority;
  read: boolean;
  ref?: string;
  subject?: string;
}


export interface InsertedErpNotificationStatus {
  id?: string;
  notification_id: string;
  read: boolean;
  hide: boolean;
  user_id: string;
}
