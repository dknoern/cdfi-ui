import { Reducer } from 'react';
import { DocumentView } from 'types/libraryViews';
import { downloadLibraryFiles } from 'tools';
import { UploadFlowState, UploadFlowStateAction } from './types';

export const flowStateReducer: Reducer<
  UploadFlowState,
  UploadFlowStateAction
> = (state, action) => {
  switch (action) {
    case 'hideNotification':
      return { ...state, uploadFinished: false };
    case 'showModal':
      return { ...state, modalActive: true };
    case 'hideModal':
      return { ...state, modalActive: false };
    default:
      if (state.uploadFinished) {
        return { ...state, modalActive: false, ...action };
      }
      return { ...state, ...action };
  }
};

export const onDownload = (files: DocumentView['id'][]) => (): void =>
  downloadLibraryFiles(files);
