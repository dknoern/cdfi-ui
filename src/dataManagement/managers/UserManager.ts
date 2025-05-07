import {
  getUsersByCompany,
  getUsersByCompanyType,
  createUser,
  updateUser,
  deleteUsers,
  updatePassword,
  submitUsername4PasswordReset,
  submitUsername4PasswordResetAdmin,
  resetPassword,
  updateUserProfile,
  acceptToS,
} from '../operations/userOperations';
import { ManagerDefault } from './ManagerDefault';

export class UserManager extends ManagerDefault {
  getUsersByCompany: typeof getUsersByCompany = (companyId) => {
    return getUsersByCompany(companyId);
  };

  getUsersByCompanyType: typeof getUsersByCompanyType = (companyType) => {
    return getUsersByCompanyType(companyType);
  };

  createUser: typeof createUser = (companyId, data) => {
    return createUser(companyId, data);
  };

  updateUser: typeof updateUser = (userId, data) => {
    return updateUser(userId, data);
  };

  deleteUsers: typeof deleteUsers = (userIds) => {
    return deleteUsers(userIds);
  };

  updatePassword: typeof updatePassword = (
    oldPassword,
    newPassword,
    username,
  ) => {
    return updatePassword(oldPassword, newPassword, username);
  };

  submitUsername4PasswordReset: typeof submitUsername4PasswordReset = (
    username,
  ) => {
    return submitUsername4PasswordReset(username);
  };

  submitUsername4PasswordResetAdmin: typeof submitUsername4PasswordReset = (
    username,
  ) => {
    return submitUsername4PasswordResetAdmin(username);
  };

  resetPassword: typeof resetPassword = (username, password, resetCode) => {
    return resetPassword(username, password, resetCode);
  };

  updateUserProfile: typeof updateUserProfile = (id, data) => {
    return updateUserProfile(id, data);
  };

  acceptToS: typeof acceptToS = userId => {
    return acceptToS(userId)
  }

}
