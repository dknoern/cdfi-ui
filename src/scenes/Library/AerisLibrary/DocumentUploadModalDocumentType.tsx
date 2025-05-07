import React, { FC, useState, useCallback } from 'react';
import { VoidFn, FileUploadFinishHandler } from 'types';
import { MODAL_WIDTH } from 'constants/ui';
import { FileUploadFormDataDocumentType } from 'types/library';
import { uploadAerisLibraryFileDocumentType } from 'tools';
import { showFormHideConfirmation } from 'tools/formTools';
import { ModalWithForm } from 'modals';
import { DocumentUploadDocumentType } from 'forms';
import { userStore, cdfiStore } from 'store';
import { libraryStore } from 'scenes/Library/PCLibrary/store';

const FORM_ID = 'documentUploadForm';

type DocumentUploadModalDocumentTypeProps = {
  visible: boolean;
  onCancel: VoidFn;
  onUploadFinish: FileUploadFinishHandler;
};

export const DocumentUploadModalDocumentType: FC<
  DocumentUploadModalDocumentTypeProps
> = ({ visible, onCancel, onUploadFinish }) => {
  const [hasFile, setHasFile] = useState(false);
  const [documentTypeId, setDocumentTypeId] = useState<any>();
  const { cdfiId } = cdfiStore;

  const onFinish = useCallback(
    (values: FileUploadFormDataDocumentType): Promise<void> => {
      return uploadAerisLibraryFileDocumentType({
        values,
        folderId:
          libraryStore.library?.folders.find(
            (folder) =>
              folder.id === libraryStore.folderIdConfig.PERFORMANCE_DATA,
          )?.id ?? 0,
        companyId: cdfiId ?? userStore.info.companyId,
        onUploadFinish,
        documentTypeId,
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
      <DocumentUploadDocumentType
        formId={FORM_ID}
        filePresented={hasFile}
        setFilePresented={setHasFile}
        onFinish={onFinish}
        forDefaultFolder
        setDocumentTypeId={setDocumentTypeId}
      />
    </ModalWithForm>
  );
};
