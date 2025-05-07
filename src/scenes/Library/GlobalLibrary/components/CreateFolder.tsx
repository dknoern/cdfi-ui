import React, { FC, useCallback } from 'react';
import { Store } from 'antd/lib/form/interface';
import { VoidFn } from 'types';
import { FolderView, GlobalLibrary } from 'types/libraryViews';
import { CreateFolderForm, initialValues } from 'forms';
import { ModalWithForm } from 'modals';
import { showFormHideConfirmation } from 'tools/formTools';
import { createGlobalFolder } from '../tools/apiTools';

type CreateFolderProps = {
  onCancel: VoidFn;
  visible: boolean;
  onFinish: VoidFn;
  libraryId: GlobalLibrary['id'];
};

export const CreateFolder: FC<CreateFolderProps> = ({
  onCancel,
  visible,
  onFinish,
  libraryId,
}) => {
  const handleFinish = useCallback(
    (values: Store) => {
      createGlobalFolder(
        libraryId,
        values as Pick<FolderView, 'name' | 'frequency' | 'description'>,
        onFinish,
      );
    },
    [libraryId, onFinish],
  );

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onCancel);
  }, [onCancel]);

  return (
    <ModalWithForm
      formId="createGlobalFolder"
      title="Create New Folder"
      visible={visible}
      onCancel={handleHide}
      actionButtonText="Create Folder"
      forceRender={false}
      showCloseButton={false}
    >
      <CreateFolderForm
        formId="createGlobalFolder"
        onFinish={handleFinish}
        initialValues={initialValues}
      />
    </ModalWithForm>
  );
};
