import { User } from './user';
import { NotificationMeta } from './notificationMeta';

export enum NotificationType {
  FILE_UPLOADED = 'FILE_UPLOADED',
  DATA_INPUT = 'DATA_INPUT',
  METRIC_VALUE_CHANGE_REQUEST = 'METRIC_VALUE_CHANGE_REQUEST',
  METRIC_VALUE_CHANGE_REQUEST_REVIEWED = 'METRIC_VALUE_CHANGE_REQUEST_REVIEWED',
  METRIC_REPORT_REQUEST = 'METRIC_REPORT_REQUEST',
  METRIC_REPORT_RESPONSE = 'METRIC_REPORT_RESPONSE',
  ALL_REQUIRED_DATA_PROVIDED = 'ALL_REQUIRED_DATA_PROVIDED',
}

export interface Notification {
  id: number;
  type: NotificationType;
  sentDate: number; // unix timestamp in sec
  isRead: boolean;
  sender: {
    id: User['id'];
    name: User['name'];
  };
  metaData?: NotificationMeta;
  message: string;
}
