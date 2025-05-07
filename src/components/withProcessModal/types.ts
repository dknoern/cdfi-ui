import { VoidFn } from 'types';
import { DocumentView } from 'types/libraryViews';
import { ModalTypes } from 'constants/ui';
import { ModalTexts } from 'forms/LibraryForms/DocumentUpload/ProcessModal/types';

type FlowStateOperations = 'showModal' | 'hideModal' | 'hideNotification';

export type UploadFlowStateAction =
  | Partial<UploadFlowState>
  | FlowStateOperations;

export type WithProcessModalProps = {
  showUploadModal: boolean;
  setUploadFlowState: (state: UploadFlowStateAction) => void;
  onDownload: (files: DocumentView['id'][]) => VoidFn;
  setTexts: (texts?: Partial<ModalTexts>) => void;
};

export interface UploadFlowState {
  uploadFinished: boolean;
  modalType: ModalTypes;
  errorDocumentId: DocumentView['id'] | undefined;
  modalActive: boolean;
}
