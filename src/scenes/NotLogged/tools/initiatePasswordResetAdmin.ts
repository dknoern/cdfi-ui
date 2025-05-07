import { User } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { uiStore } from 'store';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { UserManager } from 'dataManagement/managers/UserManager';

const mgr = dataMan.manager(ManagerName.users) as UserManager;

const OPERATION = 'INITIATE_PASSWORD_RESET_ADMIN';

export const initiatePasswordResetAdmin = (username: User['username']): Promise<void> => {
  uiStore.addLoading(OPERATION);

  return mgr
    .submitUsername4PasswordResetAdmin(username)
    .then((data) => {
      notifyUser.ok(
        data.message ?? uiText('users', 'submitUsername4PasswordResetOk'),
      );
    })
    .catch((e) => {
      notifyUser.error(
        e.data.message ?? uiText('users', 'submitUsername4PasswordResetError'),
        );
      throw e;
    })
    .finally(() => {
      uiStore.endLoading(OPERATION);
    });
};
