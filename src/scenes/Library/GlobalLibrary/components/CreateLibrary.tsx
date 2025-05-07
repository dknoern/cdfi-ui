import React, { FC, useCallback, useMemo, useState } from 'react';
import { Company, VoidFn } from 'types';
import { GlobalLibrary } from 'types/libraryViews';
import { FormSubmitFn } from 'types/form';
import { MODAL_WIDTH } from 'constants/ui';
import { ModalWithForm } from 'modals';
import { CreateLibraryForm } from 'forms/LibraryForms/CreateLibrary';
import { showFormHideConfirmation } from 'tools/formTools';
import { initialFolders, initialValues4Library } from '../constants';
import { createGlobalLibrary, folders2TableFolderRows } from '../tools';
import { globalLibraryStore } from '../store';

type CreateLibraryProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
  visible: boolean;
  companies: { label: Company['name']; value: Company['id'] }[];
};

const FORM_ID = 'createGlobalLibrary';

export const CreateLibrary: FC<CreateLibraryProps> = ({
  visible,
  onClose,
  onFinish,
  companies,
}) => {
  const {
    selectedLibrary: { folders },
  } = globalLibraryStore;

  const [selectedLibraryId, setSelectedLibraryId] = useState<
    GlobalLibrary['id'] | null
  >(null);

  const resetSelectedLibraries = useCallback(() => {
    globalLibraryStore.resetSelectedLibrary();
    setSelectedLibraryId(null);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
    resetSelectedLibraries();
  }, [onClose, resetSelectedLibraries]);

  const handleHide = useCallback(() => {
    showFormHideConfirmation(handleClose);
  }, [handleClose]);

  const onSubmit = useCallback<FormSubmitFn>(
    (form) => (values): void => {
      createGlobalLibrary(
        { ...values, folders: globalLibraryStore.selectedLibrary.folders },
        onFinish,
        form,
      );
      resetSelectedLibraries();
    },
    [onFinish, resetSelectedLibraries],
  );

  const handleLibrarySelect = useCallback((libraryId: GlobalLibrary['id']) => {
    globalLibraryStore.setSelectedLibraryExistingFolders(libraryId);
    setSelectedLibraryId(libraryId);
  }, []);

  const selectedLibraryFolders = useMemo(() => {
    if (!selectedLibraryId) return folders2TableFolderRows(initialFolders);

    return folders2TableFolderRows(folders);
  }, [selectedLibraryId, folders]);

  return (
    <ModalWithForm
      formId={FORM_ID}
      title="Create Library"
      visible={visible}
      onCancel={handleHide}
      forceRender={false}
      actionButtonText="Create library"
      width={MODAL_WIDTH.PERCENT80}
    >
      <CreateLibraryForm
        formId={FORM_ID}
        initialValues={initialValues4Library}
        onFinish={onSubmit}
        companies={companies}
        selectedLibraryFolders={selectedLibraryFolders}
        handleSelectLibrary={handleLibrarySelect}
        librariesList={globalLibraryStore.librariesList}
      />
    </ModalWithForm>
  );
};
