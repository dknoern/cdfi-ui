import React, { FC, useCallback } from 'react';
import { Store } from 'antd/lib/form/interface';
import { VoidFn } from 'types';
import { FolderView, GlobalLibrary } from 'types/libraryViews';
import { CreateFolderForm, initialValues } from 'forms';
import { ModalWithForm } from 'modals';
import { showFormHideConfirmation } from 'tools/formTools';
import { editGlobalFolder } from '../tools/apiTools';

type EditFolderProps = {
  onCancel: VoidFn;
  visible: boolean;
  onFinish: VoidFn;
  libraryId: GlobalLibrary['id'];
  folder: FolderView | null;
};

export const EditFolder: FC<EditFolderProps> = ({
  onCancel,
  visible,
  onFinish,
  libraryId,
  folder,
}) => {
  const folderId = folder?.id;
  const handleFinish = useCallback(
    (values: Store) => {
      editGlobalFolder(
        libraryId,
        {
          ...(values as Pick<
            FolderView,
            'frequency' | 'name' | 'description' | 'id'
          >),
          id: folderId ?? 0,
        },
        onFinish,
      );
    },
    [libraryId, onFinish, folderId],
  );

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onCancel);
  }, [onCancel]);

  return (
    <ModalWithForm
      formId="editGlobalFolder"
      title="Edit Folder"
      visible={visible}
      onCancel={handleHide}
      actionButtonText="Save"
      forceRender={false}
      showCloseButton={false}
    >
      <CreateFolderForm
        formId="editGlobalFolder"
        onFinish={handleFinish}
        initialValues={folder ?? initialValues}
      />
    </ModalWithForm>
  );
};
