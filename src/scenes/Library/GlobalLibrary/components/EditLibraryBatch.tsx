import React, { FC } from 'react';
import { VoidFn } from 'types';
import { GlobalLibrary } from 'types/libraryViews';
import { EditLibraryLine } from 'components/EditButtonsLine';
import { Delete } from 'components/EditButtonsLine/components';
import { libraryStore } from 'scenes/Library/FMLibrary/store';
import { isDeleteDisabled } from '../tools';

type EditLibraryBatchProps = {
  onDeleteClick: VoidFn;
  libraryId: GlobalLibrary['id'];
};

export const EditLibraryBatch: FC<EditLibraryBatchProps> = ({
  onDeleteClick,
  libraryId,
}) => (
  <EditLibraryLine selectedItems={libraryStore.selectedItems}>
    <Delete disabled={isDeleteDisabled(libraryId)} onClick={onDeleteClick} />
  </EditLibraryLine>
);
