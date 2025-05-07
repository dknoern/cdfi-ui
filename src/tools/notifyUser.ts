import { ReactElement } from 'react';
import { toast } from 'react-toastify';
import { uiText } from 'constants/uiText';
import { uiStore } from 'store';

type Arg = string | ReactElement;
type Args = Arg[];

const makeMessage = (args: Args): Arg => {
  if (args.length > 1) {
    return uiText(args[0], args[1]) ?? '';
  }
  return args[0];
};

type MessageType = 'success' | 'error' | 'warning' | 'info';
class NotifyUser {
  showMessage = (args: Args, type: MessageType): void => {
    toast(makeMessage(args), { type });
  };

  ok = (...args: Args): void => {
    this.showMessage(args, 'success');
    uiStore.setErrorMsgLength(args[0].toString().length);
  };

  error = (...args: Args): void => {
    this.showMessage(args, 'error');
    uiStore.setErrorMsgLength(args[0].toString().length);
  };

  warning = (...args: Args): void => {
    this.showMessage(args, 'warning');
    uiStore.setErrorMsgLength(args[0].toString().length);
  };

  info = (...args: Args): void => {
    this.showMessage(args, 'info');
    uiStore.setErrorMsgLength(args[0].toString().length);
  };
}

export const notifyUser = new NotifyUser();
