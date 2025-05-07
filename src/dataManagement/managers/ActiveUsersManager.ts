import { ManagerDefault } from './ManagerDefault';
import { UserSimple } from 'types';
import { getAerisAdminUsers, getSubscriberCdfiUsers } from '../operations/aerisAdminUsersOperations';
import { showAPIError } from 'tools';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';

export interface ActiveUsersManagerResults {
  aerisAdminUsers: UserSimple[],
  subscriberUsers: UserSimple[],
  cdfiUsers: UserSimple[],
}

export class ActiveUsersManager extends ManagerDefault<ActiveUsersManagerResults> {
  reload = (): void => {
    this.proceedReload(
      () => Promise.all([getAerisAdminUsers(),  getSubscriberCdfiUsers('INVESTOR'),  getSubscriberCdfiUsers('CDFI')])
      .then((values): ActiveUsersManagerResults => ({
        aerisAdminUsers: values[0],
        subscriberUsers: values[1],
        cdfiUsers: values[2],
      })),
      (e) => {
        notifyUser.error(uiText('activeUsers', 'loadError'));
      },
    );
  };
}