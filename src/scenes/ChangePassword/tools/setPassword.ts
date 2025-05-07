import { uiText } from 'constants/uiText';
import { Log, authTools, notifyUser } from 'tools';
import { uiStore, userStore } from 'store';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { UserManager } from 'dataManagement/managers/UserManager';

const mgr = dataMan.manager(ManagerName.users) as UserManager;

const OPERATION = 'SET_PASSWORD';

type SetPasswordArg = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

export const setPassword = ({
  username,
  oldPassword,
  newPassword,
}: SetPasswordArg): void => {
  uiStore.addLoading(OPERATION);

  mgr
    .updatePassword(oldPassword, newPassword, username)
    .then((data) => {
      const { token } = data;

      authTools.storeUserInfo(token);
      userStore.setToken(token);

      notifyUser.ok(uiText('users', 'updatePasswordOk'));
    })
    .catch((e) => {
      Log.error('[ChangePassword]', e);

      notifyUser.error(uiText('users', 'updatePasswordError'));
    })
    .finally(() => {
      uiStore.endLoading(OPERATION);
    });
};
