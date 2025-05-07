import { PlainTextModalFlow, ModalConfig } from 'types/plainTextModal';
import { DownloadFileNames } from './downloadFileNames';

export const plainTextModals: Record<PlainTextModalFlow, ModalConfig> = {
  termsOfUse: {
    mdEndpoint: 'termsOfUseMD',
    pdfEndpoint: 'termsOfUsePDF',
    fileName: DownloadFileNames.termsOfUse,
  },
  privacyPolicy: {
    mdEndpoint: 'privacyPolicyMD',
    pdfEndpoint: 'privacyPolicyPDF',
    fileName: DownloadFileNames.privacyPolicy,
  },
};
