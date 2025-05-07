import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { LibraryTableItem, LibraryTableRow } from 'types/libraryTableItem';
import { GlobalLibrary } from 'types/libraryViews';
import { FormSubmitFn } from 'types/form';
import { MODAL_WIDTH } from 'constants/ui';
import { ModalWithForm } from 'modals';
import { CreateLibraryForm } from 'forms/LibraryForms/CreateLibrary';
import { showFormHideConfirmation } from 'tools/formTools';
import { updateGlobalLibrary } from '../tools';

type EditLibraryProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
  visible: boolean;
  library: LibraryTableRow<LibraryTableItem>;
};

export const EditLibrary: FC<EditLibraryProps> = ({
  visible,
  onClose,
  onFinish,
  library,
}) => {
  const onSubmit = useCallback<FormSubmitFn>(
    (form) => (values): void => {
      updateGlobalLibrary(
        library.id,
        values as Pick<GlobalLibrary, 'id' | 'name'>,
        onFinish,
        form,
      );
    },
    [onFinish, library.id],
  );

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onClose);
  }, [onClose]);

  return (
    <ModalWithForm
      formId="editGlobalLibrary"
      title="Edit Library"
      visible={visible}
      onCancel={handleHide}
      forceRender={false}
      actionButtonText="Update"
      width={MODAL_WIDTH.MEDIUM}
    >
      <CreateLibraryForm
        formId="editGlobalLibrary"
        initialValues={{
          id: library.id,
          name: library.name,
        }}
        onFinish={onSubmit}
      />
    </ModalWithForm>
  );
};
