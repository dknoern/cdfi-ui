import { ButtonType } from 'antd/lib/button';
import { typography } from 'constants/typography';
import { FileUploadStatus } from './types';

const {
  processSuccessModalTitle,
  processSuccessModalDescription,
  processSuccessModalInstructions,
  processFailureModalTitle,
  processFailureModalDescription,
  processFailureModalInstructions,
  fileErrorModalDescription,
  fileErrorModalInstructions,
} = typography('portfolioCompanyData');

export const uiText4ProcessModal = {
  [FileUploadStatus.SUCCESS]: {
    title: processSuccessModalTitle,
    description: processSuccessModalDescription,
    instructions: processSuccessModalInstructions,
  },
  [FileUploadStatus.ERROR_COMMON]: {
    title: processFailureModalTitle,
    description: processFailureModalDescription,
    instructions: processFailureModalInstructions,
  },
  [FileUploadStatus.ERROR_FILE]: {
    title: processFailureModalTitle,
    description: fileErrorModalDescription,
    instructions: fileErrorModalInstructions,
  },
};

export const gotItBtnConfigDefault = {
  key: 'primary',
  text: 'Got it',
  id: 'gotItBtn',
  type: 'primary' as ButtonType,
};

export const downloadBtnConfigDefault = {
  key: 'default',
  text: 'Download',
  id: 'downloadBtn',
  type: 'default' as ButtonType,
};
