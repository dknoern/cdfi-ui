import { ModalTypes } from 'constants/ui';
import { VoidFn } from 'types';
import { ButtonConfig } from 'modals/NotificationModal/types';
import { FileUploadStatus } from './types';
import { gotItBtnConfigDefault, downloadBtnConfigDefault } from './constants';

export const detectFileUploadStatus = (
  type: ModalTypes,
  isFileErrorCase: boolean,
): FileUploadStatus => {
  switch (true) {
    case type === ModalTypes.Error && isFileErrorCase:
      return FileUploadStatus.ERROR_FILE;
    case type === ModalTypes.Error:
      return FileUploadStatus.ERROR_COMMON;
    default:
      return FileUploadStatus.SUCCESS;
  }
};

export const getGotItBtnConfig = (onOk: VoidFn): ButtonConfig => {
  return {
    ...gotItBtnConfigDefault,
    action: onOk,
  };
};

export const getDownloadBtnConfig = (onDownload: VoidFn): ButtonConfig => {
  return {
    ...downloadBtnConfigDefault,
    action: onDownload,
  };
};
