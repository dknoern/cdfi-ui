import { apiProcessor } from 'tools';
import { Notification } from 'types';

export const listNotifications = (): Promise<Notification[]> => {
  return apiProcessor.get('notificationsList');
};

export const pollNotifications = (
  dateFrom: number,
): Promise<Notification[]> => {
  return apiProcessor.get('notificationsPoll', dateFrom);
};

export const markRead = (ids: Notification['id'][]): Promise<void> => {
  return apiProcessor.patch('notificationsMarkRead', ids.join(','));
};
