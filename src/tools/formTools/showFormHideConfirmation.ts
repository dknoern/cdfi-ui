import { VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { Dialog } from '../dialog';

export const showFormHideConfirmation = (onOk: VoidFn): void => {
  Dialog.confirm({
    title: uiText('modal', 'confirmClose'),
    content: uiText('modal', 'confirmEnteredDataLoss'),
    onOk,
  });
};
