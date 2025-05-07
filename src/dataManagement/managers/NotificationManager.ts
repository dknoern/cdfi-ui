import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { ManagerDefault } from './ManagerDefault';
import { listNotifications } from '../operations/notificationOperations';

export class NotificationManager extends ManagerDefault {
  reload = (): void => {
    this.proceedReload(
      listNotifications,
      showAPIError(uiText('notifications', 'loadFailed')),
    );
  };
}
