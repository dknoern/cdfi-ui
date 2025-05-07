import { typography } from 'constants/typography';

const { passwordsMatchingError } = typography('authentication');

export const checkPasswordsMatching = (
  password: string,
  repeatedPassword: string,
): Promise<string | void> => {
  if (!repeatedPassword || password === repeatedPassword) {
    return Promise.resolve();
  }
  return Promise.reject(new Error(passwordsMatchingError));
};
