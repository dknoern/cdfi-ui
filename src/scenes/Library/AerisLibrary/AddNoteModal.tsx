import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { ModalWithForm } from 'modals';
import { notifyUser } from 'tools';
import { showAPIError } from 'tools/APITools';
import { library as libraryManager } from 'dataManagement';
import { cdfiStore } from 'store';
import { AddNoteForm, AddNoteFormData } from './AddNoteForm';

type AddNoteModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  documentTypeId: number;
  reviewId: number;
};

export const AddNoteModal: FC<AddNoteModalProps> = ({
  visible,
  onClose,
  onFinish,
  documentTypeId,
  reviewId,
}) => {
  const { cdfiId } = cdfiStore;

  const onAddNote = useCallback(
    (values: AddNoteFormData) => {
      let valuesToSubmit = {
        note: values.note,
        documentTypeId: documentTypeId,
      };
      libraryManager
        .addNote(cdfiId, reviewId, valuesToSubmit)
        .then(() => {
          notifyUser.ok(uiText('library', 'addNoteOk'));
          onFinish();
        })
        .catch(showAPIError(uiText('library', 'addNoteError')))
        .finally(() => {
          onClose();
        });
    },
    [onFinish],
  );

  const formId = 'ADD_NOTE';

  return (
    <ModalWithForm
      formId={formId}
      title={'Add Note'}
      visible={visible}
      onCancel={onClose}
      forceRender={false}
      actionButtonText='Save'
    >
      <AddNoteForm onFinish={onAddNote} formId={formId} />
    </ModalWithForm>
  );
};
