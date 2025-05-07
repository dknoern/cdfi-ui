import {
  User,
  UserEditFormData,
  ResponseObject,
  Company,
  AuthToken,
} from 'types';
import { CurrentUserType } from 'components/Layout/components/Profile';
import { apiProcessor } from 'tools/apiProcessor';
import { performRequest } from 'tools/APITools';

export const getUsersByCompany = (companyId: Company['id']): Promise<User[]> =>
  performRequest<User[]>('usersByCompany', (operationName) =>
    apiProcessor.get(operationName, companyId),
  );

export const getUsersByCompanyType = (
  companyType: Company['type'],
): Promise<User[]> =>
  performRequest<User[]>('usersByCompanyType', (operationName) =>
    apiProcessor.get(operationName, companyType),
  );

export const createUser = (
  companyId: Company['id'],
  data: UserEditFormData,
): Promise<void> => {
  return performRequest<void>('userCreate', (operationName) =>
    apiProcessor.post(operationName, companyId, {
      ...data,
      primary: false,
    }),
  );
};

export const updateUser = (
  userId: User['id'],
  data: UserEditFormData,
): Promise<void> =>
  performRequest('userUpdate', (operationName) =>
    apiProcessor.patch(operationName, userId, data),
  );

export const deleteUsers = (userId: User['id'][]): Promise<void> =>
  performRequest('userDelete', (operationName) =>
    apiProcessor.delete(operationName, userId),
  );

export const updatePassword = (
  oldPassword: string,
  newPassword: string,
  username: string,
): Promise<{ token: AuthToken }> =>
  performRequest('userUpdatePassword', (operationName) =>
    apiProcessor.put(operationName, username || 0, {
      oldPassword,
      newPassword,
    }),
  );

export const submitUsername4PasswordReset = (
  username: User['username'],
): Promise<ResponseObject> =>
  performRequest<ResponseObject>(
    'submitUsername4PasswordReset',
    (operationName) =>
      apiProcessor.post(operationName, null, { username }, false),
  );

export const submitUsername4PasswordResetAdmin = (
  username: User['username'],
): Promise<ResponseObject> =>
  performRequest<ResponseObject>(
    'submitUsername4PasswordResetAdmin',
    (operationName) =>
      apiProcessor.post(operationName, null, { username }, false),
  );

export const resetPassword = (
  username: User['username'],
  password: string,
  resetCode: string,
): Promise<ResponseObject> =>
  performRequest('resetPassword', (operationName) =>
    apiProcessor.post(
      operationName,
      null,
      {
        username,
        newPassword: password,
        resetCode,
      },
      false,
    ),
  );

export const getUser = (id: number): Promise<CurrentUserType> => {
  return performRequest<CurrentUserType>('userGet', (operationName) =>
    apiProcessor.get(operationName, id),
  );
};

export const updateUserProfile = (
  id: number,
  data: CurrentUserType,
): Promise<CurrentUserType> => {
  return performRequest('userProfileUpdate', (operationName) =>
    apiProcessor.patch(operationName, id, data),
  );
};

export const acceptToS = (userId: number): Promise<void> => {
  return performRequest('acceptTermsOfService', (operationName) =>
    apiProcessor.patch(operationName, userId),
  );
};
