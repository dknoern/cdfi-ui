import { User } from 'types';

// export type PasswordResetInitiation = {
//   resetCode: string;
//   email: User['email'];
// };

// export type SubmitEmailFormValues = {
//   email: User['email'];
// };

export type PasswordResetInitiation = {
  resetCode: string;
  username: User['username'];
};

export type SubmitUsernameFormValues = {
  username: User['username'];
};
