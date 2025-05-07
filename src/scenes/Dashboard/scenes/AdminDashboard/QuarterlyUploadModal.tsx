import React, { FC, useState, useCallback } from 'react';
import { VoidFn, FileUploadFinishHandler } from 'types';
import { MODAL_WIDTH } from 'constants/ui';
import { FileUploadFormData } from 'types/library';
import { uploadQuarterlyFile } from 'tools';
import { showFormHideConfirmation } from 'tools/formTools';
import { ModalWithForm } from 'modals';
import { DocumentUpload } from 'forms';
import { userStore, cdfiStore } from 'store';

const FORM_ID = 'documentUploadForm';

type QuarterlyUploadModalProps = {
  visible: boolean;
  onCancel: VoidFn;
  onUploadFinish: FileUploadFinishHandler;
  documentTypeId: number;
  defaultYear: number;
  defaultQuarter: number;
};

export const QuarterlyUploadModal: FC<QuarterlyUploadModalProps> = ({
  visible,
  onCancel,
  onUploadFinish,
  documentTypeId,
  defaultYear,
  defaultQuarter
}) => {
  const [hasFile, setHasFile] = useState(false);
  const { cdfiId } = cdfiStore;
  const onFinish = useCallback(
    (values: FileUploadFormData): Promise<void> => {
      return uploadQuarterlyFile({
        values,
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
      width={MODAL_WIDTH.SMALL}
      showCloseButton={false}
    >
      <DocumentUpload
        formId={FORM_ID}
        filePresented={hasFile}
        setFilePresented={setHasFile}
        onFinish={onFinish}
        forDefaultFolder
        defaultYear={defaultYear}
        defaultQuarter={defaultQuarter}
      />
    </ModalWithForm>
  );
};
