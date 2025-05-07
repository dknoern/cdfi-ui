import { NotificationsConfig, Company } from 'types';
import { ManagerDefault } from './ManagerDefault';
import {
  getNotificationsConfigByCompanyId,
  updateNotificationsConfig,
} from '../operations/notificationsConfigOperations';

export class NotificationsConfigManager extends ManagerDefault<
  NotificationsConfig
> {
  getByCompanyId = (companyId: Company['id']): Promise<NotificationsConfig> => {
    return getNotificationsConfigByCompanyId(companyId);
  };

  updateByCompanyId = (
    companyId: Company['id'],
    data: NotificationsConfig,
  ): Promise<NotificationsConfig> => {
    return updateNotificationsConfig(companyId, data);
  };
}
