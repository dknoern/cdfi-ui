import React, { FC, useCallback } from 'react';
import { Store } from 'antd/lib/form/interface';
import { FormProps } from 'antd/lib/form';
import { VoidFn } from 'types';
import { CreateFolderForm, initialValues } from 'forms';
import { ModalWithForm } from 'modals';
import { formStore } from 'forms/PCCreate/formStore';
import { FormStep } from 'forms/PCCreate/types';

type CreateFolderModalProps = {
  onClose: VoidFn;
  visible: boolean;
  formId: FormProps['id'];
};

const { setData } = formStore;
const step = FormStep.librarySetup;

export const CreateFolderModal: FC<CreateFolderModalProps> = ({
  onClose,
  visible,
  formId,
}) => {
  const { data } = formStore;

  const handleFinish = useCallback(
    (values: Store) => {
      setData(step, {
        ...(data[step] as any),
        createFolders: [
          ...(data[step] as any).createFolders,
          { ...values, id: new Date().getTime() },
        ],
      });
      onClose();
    },
    [onClose, data],
  );

  return (
    <ModalWithForm
      formId={formId ?? 'createFolder'}
      title="Create New Folder"
      visible={visible}
      onCancel={onClose}
      actionButtonText="Create Folder"
      forceRender={false}
      showCloseButton={false}
    >
      <CreateFolderForm
        formId={formId ?? 'createFolder'}
        onFinish={handleFinish}
        initialValues={initialValues}
      />
    </ModalWithForm>
  );
};
