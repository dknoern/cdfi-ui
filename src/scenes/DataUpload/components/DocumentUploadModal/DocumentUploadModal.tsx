import React, { FC, useState, useCallback } from 'react';
import { VoidFn, FileUploadFinishHandler } from 'types';
import { MODAL_WIDTH } from 'constants/ui';
import { FileUploadFormData } from 'types/library';
import { uploadLibraryFile } from 'tools';
import { showFormHideConfirmation } from 'tools/formTools';
import { ModalWithForm } from 'modals';
import { DocumentUpload } from 'forms';
import { userStore } from 'store';
import { libraryStore } from 'scenes/Library/PCLibrary/store';

const FORM_ID = 'documentUploadForm';

type DocumentUploadModalProps = {
  visible: boolean;
  onCancel: VoidFn;
  onUploadFinish: FileUploadFinishHandler;
};

export const DocumentUploadModal: FC<DocumentUploadModalProps> = ({
  visible,
  onCancel,
  onUploadFinish,
}) => {
  const [hasFile, setHasFile] = useState(false);

  const onFinish = useCallback(
    (values: FileUploadFormData): Promise<void> => {
      return uploadLibraryFile({
        values,
        folderId:
          libraryStore.library?.folders.find(
            (folder) =>
              folder.id === libraryStore.folderIdConfig.PERFORMANCE_DATA,
          )?.id ?? 0,
        companyId: userStore.info.companyId,
        onUploadFinish,
      });
    },
    [onUploadFinish],
  );

  const handleHide = useCallback(() => {
    showFormHideConfirmation(() => {
      onCancel();
      setHasFile(false);
    });
  }, [onCancel]);

  return (
    <ModalWithForm
      formId={FORM_ID}
      title="Document Upload"
      visible={visible}
      onCancel={handleHide}
      actionButtonText="Upload"
      forceRender={false}
      width={MODAL_WIDTH.SMALL}
      showCloseButton={false}
    >
      <DocumentUpload
        formId={FORM_ID}
        filePresented={hasFile}
        setFilePresented={setHasFile}
        onFinish={onFinish}
        forDefaultFolder
      />
    </ModalWithForm>
  );
};
