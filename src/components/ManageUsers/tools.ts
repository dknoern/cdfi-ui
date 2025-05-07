import { User, UserEditFormData, Company } from 'types';
import { CurrentUserType } from 'components/Layout/components/Profile';
import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { UserManager } from 'dataManagement/managers/UserManager';

const mgr = dataMan.manager(ManagerName.users) as UserManager;

interface SaveFn {
  (
    companyId: Company['id'],
    userId: User['id'] | null,
    data: UserEditFormData,
  ): Promise<void>;
}

export const saveUser: SaveFn = (companyId, userId, data) => {
  const proceedSave = userId
    ? (): ReturnType<typeof mgr.updateUser> => mgr.updateUser(userId, data)
    : (): ReturnType<typeof mgr.createUser> => mgr.createUser(companyId, data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('users', userId ? 'updateOk' : 'createOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('users', userId ? 'updateError' : 'createError');
      showAPIError(message)(error);
    });
};

export const deleteUsers = (userIds: User['id'][]): Promise<void> => {
  return mgr
    .deleteUsers(userIds)
    .then(() => {
      notifyUser.ok(uiText('users', 'deleteOk'));
      mgr.reload();
    })
    .catch(showAPIError(uiText('users', 'deleteError')));
};

export const updateProfile = (id: number, data: CurrentUserType) => {
  return mgr
    .updateUserProfile(id, data)
    .then(() => {
      notifyUser.ok(uiText('users', 'updateProfileOk'));
    })
    .catch(showAPIError(uiText('users', 'updateProfileError')));
};
