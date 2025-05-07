import React, { FC, useCallback, useState } from 'react';
import { VoidFn, User } from 'types';
import { EditButtonsLine } from 'components';
import { Delete, Edit } from 'components/EditButtonsLine/components';
import { BatchDelete } from 'components/BatchDelete';

type EditUsersBatchProps = {
  selectedUserIds: User['id'][];
  users: User[];
  onStartEdit: (userId: User['id']) => void;
  onStartDelete: (userId: User['id'][]) => void;
  onFinish: VoidFn;
};

export const EditUsersBatch: FC<EditUsersBatchProps> = ({
  selectedUserIds,
  onStartEdit,
  onStartDelete,
  onFinish,
}) => {
  const [showDeleteBatch, setShowDeleteBatch] = useState(false);

  const proceedDelete = useCallback(() => {
    if (!selectedUserIds.length) return;

    onStartDelete(selectedUserIds);
    setShowDeleteBatch(false);
    onFinish();
  }, [onFinish, onStartDelete, selectedUserIds]);

  return (
    <>
      <EditButtonsLine
        textHelper={
          selectedUserIds.length
            ? `${selectedUserIds.length} users selected`
            : 'Select users'
        }
      >
        <Edit
          disabled={selectedUserIds.length !== 1}
          onClick={(): void => onStartEdit(selectedUserIds[0])}
        />
        {/* TODO: ADD BACK IN WHEN WORKING ON DELETE USER FUNCTIONALITY
        <Delete
          disabled={!selectedUserIds.length}
          onClick={(): void => setShowDeleteBatch(true)}
        /> */}
      </EditButtonsLine>
      <BatchDelete
        visible={showDeleteBatch}
        onClose={(): void => setShowDeleteBatch(false)}
        onConfirm={proceedDelete}
      />
    </>
  );
};
