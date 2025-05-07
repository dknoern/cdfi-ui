import { DownloadFileNames } from 'constants/downloadFileNames';
import { AuthToken } from './auth';

export type PlainTextModalFlow = 'termsOfUse' | 'privacyPolicy';

export type ModalConfig = {
  mdEndpoint: string;
  pdfEndpoint: string;
  fileName: DownloadFileNames;
};

export type DocumentContent = {
  message: string;
};

export type ProcessDocumentResponse = {
  token: AuthToken;
};
