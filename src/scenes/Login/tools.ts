import { authTools, Log, notifyUser } from 'tools';
import { uiText } from 'constants/uiText';

type ProcessLoginArg = {
  username: string;
  password: string;
};

export const processLogin = async ({
  username,
  password,
}: ProcessLoginArg): Promise<void> => {
  if (username.trim() === '' || password.trim() === '') return;

  try {
    const result = await authTools.authenticate(username, password);
    Log.log('login result', result);
  } catch (error) {
    Log.error('error.response', (error as any).response );

    const errorText = (error as any).response ? (error as any).message : 'Network error';
    notifyUser.error(uiText('login', 'error', errorText));
  }
};
