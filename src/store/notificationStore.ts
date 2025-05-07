import { decorate, observable, action, computed } from 'mobx';
import { Notification, VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import {
  NOTIFICATIONS_POLLING_INTERVAL,
  NOTIFICATIONS_POLLING_ENABLED,
} from 'constants/misc';
import { showAPIError, Log } from 'tools';
import {
  listNotifications,
  pollNotifications,
  markRead,
} from 'dataManagement/operations/notificationOperations';

enum NotificationStoreState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  READY = 'READY',
  ERROR = 'ERROR',
  POLLING = 'POLLING',
}

// TODO remove all things related to notificationGroups
// after removing all the old ui parts
class NotificationStore {
  notifications: Notification[] = [];

  // notificationGroups: NotificationGroup[] = [];

  state = NotificationStoreState.IDLE;

  pollingTimer: NodeJS.Timeout | null = null;

  get isReady(): boolean {
    return [
      NotificationStoreState.READY,
      NotificationStoreState.POLLING,
    ].includes(this.state);
  }

  loadNotifications = (): void => {
    if (this.state === NotificationStoreState.LOADING) return;

    this.state = NotificationStoreState.LOADING;
  };

  addNotifications = (data: Notification[]): void => {
    this.notifications.splice(0, 0, ...data);
  };

  poll = (): void => {
    if (this.state !== NotificationStoreState.READY) return;

    this.state = NotificationStoreState.POLLING;

    pollNotifications(this.lastNotificationDate)
      .then(this.addNotifications)
      .catch(() => {
        Log.error(uiText('notifications', 'pollingError'));
        this.stopPolling();
      })
      .finally(() => {
        this.state = NotificationStoreState.READY;
      });
  };

  stopPolling = (): void => {
    if (!this.pollingTimer) return;

    clearInterval(this.pollingTimer);
  };

  startPolling = (): VoidFn => {
    this.pollingTimer = setInterval(this.poll, NOTIFICATIONS_POLLING_INTERVAL);

    return this.stopPolling;
  };

  markRead = (ids: Notification['id'][]): void => {
    if (ids.length < 1) return;

    this.notifications = this.notifications.map((item) =>
      ids.includes(item.id) ? { ...item, isRead: true } : item,
    );

    markRead(ids).catch((e) => {
      Log.error('[NotificationStore] markRead error', e);
    });
  };

  markReadAll = (): void => {
    this.markRead(
      this.notifications.filter((item) => !item.isRead).map((item) => item.id),
    );
  };

  get hasNotifications(): boolean {
    return !!this.notifications.length;
  }

  get notificationsCount(): number {
    return this.notifications.length;
  }

  get hasUnread(): boolean {
    return this.notifications.some((item) => !item.isRead);
  }

  get lastNotificationDate(): Notification['sentDate'] {
    return Math.max(...this.notifications.map((item) => item.sentDate), 0);
  }

  get unreadCount(): number {
    return (this.notifications.filter((item) => !item.isRead) || []).length;
  }
}

decorate(NotificationStore, {
  notifications: observable,
  state: observable,
  loadNotifications: action,
  hasNotifications: computed,
  notificationsCount: computed,
  isReady: computed,
  poll: action,
  startPolling: action,
  stopPolling: action,
  addNotifications: action,
  markRead: action,
  markReadAll: action,
  hasUnread: computed,
  lastNotificationDate: computed,
  unreadCount: computed,
});

export const notificationStore = new NotificationStore();
