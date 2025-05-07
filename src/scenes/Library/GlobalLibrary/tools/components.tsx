import React from 'react';
import { Button } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { VoidFn } from 'types';
import { FolderView, GlobalLibrary } from 'types/libraryViews';
import { globalLibraryStore } from '../store';
import styles from '../GlobalLibrary.module.scss';

export const getTitle = (
  isRootFolder: boolean,
  libraryId: GlobalLibrary['id'],
  folderId: FolderView['id'],
  onEdit: VoidFn,
  onDelete: VoidFn,
) => {
  if (isRootFolder) {
    const library = globalLibraryStore.getLibraryData(libraryId);
    return (
      <div className={styles.libraryTitle}>
        {library.name}
        <Button type="link" className={styles.editBtn} onClick={onEdit}>
          <EditFilled />
        </Button>
        <Button type="link" className={styles.editBtn} onClick={onDelete}>
          <DeleteFilled />
        </Button>
      </div>
    );
  }
  const folder = globalLibraryStore.getFolderData(libraryId, folderId);
  return <div className={styles.libraryTitle}>{folder.name}</div>;
};
