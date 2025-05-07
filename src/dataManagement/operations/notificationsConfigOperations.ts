import { apiProcessor } from 'tools/apiProcessor';
import { NotificationsConfig, Company } from 'types';

export const getNotificationsConfigByCompanyId = (
  companyId: Company['id'],
): Promise<NotificationsConfig> => {
  return apiProcessor.get('notificationsConfig', companyId);
};

export const updateNotificationsConfig = (
  companyId: Company['id'],
  data: Partial<NotificationsConfig>,
): Promise<NotificationsConfig> => {
  return apiProcessor.patch('notificationsConfig', companyId, data);
};
