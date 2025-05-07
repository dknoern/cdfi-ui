import React, { useState, useReducer } from 'react';
import { ProcessModal } from 'forms';
import { ModalTexts } from 'forms/LibraryForms/DocumentUpload/ProcessModal/types';
import { WithProcessModalProps } from './types';
import { uploadFlowDefaultState } from './constants';
import { flowStateReducer, onDownload } from './tools';

export const withProcessModal = <OriginalProps extends {}>(
  WrappedComponent: React.ComponentType<OriginalProps & WithProcessModalProps>,
): React.ComponentType<OriginalProps> => {
  return (props: OriginalProps): JSX.Element => {
    const [uploadFlowState, dispatchUploadFlowState] = useReducer(
      flowStateReducer,
      uploadFlowDefaultState,
    );
    const [texts, setTexts] = useState<Partial<ModalTexts>>(); // used to show in process modal

    const processModalProps: WithProcessModalProps = {
      setUploadFlowState: dispatchUploadFlowState,
      showUploadModal: uploadFlowState.modalActive,
      onDownload,
      setTexts,
    };

    return (
      <>
        <WrappedComponent {...props} {...processModalProps} />
        {uploadFlowState.uploadFinished && (
          <ProcessModal
            type={uploadFlowState.modalType}
            onOk={(): void => dispatchUploadFlowState('hideNotification')}
            onDownload={onDownload([uploadFlowState.errorDocumentId ?? 0])}
            isFileErrorCase={!!uploadFlowState.errorDocumentId}
            texts={texts}
          />
        )}
      </>
    );
  };
};
