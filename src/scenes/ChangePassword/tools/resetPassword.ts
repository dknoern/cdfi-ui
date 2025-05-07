import { User } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { uiStore } from 'store';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { UserManager } from 'dataManagement/managers/UserManager';

const mgr = dataMan.manager(ManagerName.users) as UserManager;

const OPERATION = 'RESET_PASSWORD';

export const resetPassword = (
  username: User['username'],
  password: string,
  resetCode: string,
): Promise<void> => {
  uiStore.addLoading(OPERATION);

  return mgr
    .resetPassword(username, password, resetCode)
    .then((data) => {
      notifyUser.ok(data.message ?? uiText('users', 'passwordResetOk'));
    })
    .catch((e) => {
      notifyUser.error(e.data.message ?? uiText('users', 'passwordResetError'));

      throw e;
    })
    .finally(() => {
      uiStore.endLoading(OPERATION);
    });
};
