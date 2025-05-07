import { apiProcessor } from 'tools/apiProcessor';
import { UserSimple } from '../../types';

export const getAerisAdminUsers = (): Promise<UserSimple[]> => {
  return apiProcessor.get('aerisAdminUsers');
};

export const getSubscriberCdfiUsers = (companyType: string): Promise<UserSimple[]> => {
  return apiProcessor.get('subscriberCdfiUsers', companyType );
};
