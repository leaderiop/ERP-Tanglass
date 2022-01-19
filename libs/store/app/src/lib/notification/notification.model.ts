export interface MNotification {
  id?: string;
  message: string;
  title?: string;
  operation?: string;
  icon?: string;
  time?: Date;
  route?: string;
  color: string;
  read?: boolean;
}
