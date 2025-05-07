import React, { FC, useCallback, useState, useEffect } from 'react';
import { Note, VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { ModalWithForm } from 'modals';
import { notifyUser } from 'tools';
import { showAPIError } from 'tools/APITools';
import { library as libraryManager } from 'dataManagement';
import { cdfiStore } from 'store';
import { AddNoteForm, AddNoteFormData } from './AddNoteForm';
import { Table } from 'antd';
import { makeNotesColumns } from './constants';

type ViewModifyNoteModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  onDeleteFinish: VoidFn;
  documentTypeId: number;
  reviewId: number;
  notes: Note[];
};

type NoteData = Note & {
  key: React.Key;
};

function addIdAsKey(data: Note[]): NoteData[] {
  return data.map((note) => ({ key: note.id, ...note }));
}

export const ViewModifyNoteModal: FC<ViewModifyNoteModalProps> = ({
  visible,
  onClose,
  onFinish,
  onDeleteFinish,
  documentTypeId,
  reviewId,
  notes,
}) => {
  const { cdfiId } = cdfiStore;

  const [data, setData] = useState<NoteData[]>();

  useEffect(() => {
    setData(addIdAsKey(notes ? notes : []));
  }, [notes]);

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
        .catch(showAPIError(uiText('library', 'addNoteError')));
    },
    [onFinish],
  );

  const formId = 'VIEW_MODIFY_NOTE';

  const [deleteNoteId, setDeleteNoteId] = useState<number | undefined>();

  const columns = makeNotesColumns(setDeleteNoteId);

  useEffect(() => {
    if (deleteNoteId) {
      libraryManager
        .deleteNote(cdfiId, reviewId, deleteNoteId)
        .then(() => {
          notifyUser.ok(uiText('library', 'deleteNoteOk'));
          onDeleteFinish();
        })
        .catch(showAPIError(uiText('library', 'deleteNoteError')));
    }
  }, [deleteNoteId]);

  return (
    <ModalWithForm
      formId={formId}
      title={'View / Add to Note'}
      visible={visible}
      onCancel={onClose}
      forceRender={false}
      actionButtonText="Add Note"
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        size={'small'}
        scroll={{ y: '50vh' }}
      ></Table>
      <AddNoteForm formId={formId} onFinish={onAddNote}></AddNoteForm>
    </ModalWithForm>
  );
};
