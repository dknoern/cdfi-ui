export enum FileUploadStatus {
  SUCCESS = 'SUCCESS',
  ERROR_COMMON = 'ERROR_COMMON',
  ERROR_FILE = 'ERROR_FILE',
}

export interface ModalTexts {
  title: React.ReactNode;
  description: React.ReactNode;
  instructions: React.ReactNode;
}
