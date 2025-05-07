import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { GlobalLibrary } from 'types/libraryViews';
import { ModalTypes } from 'constants/ui';
import { uiText } from 'constants/uiText';
import { NotificationModal } from 'modals';
import { notifyUser } from 'tools';
import { showAPIError } from 'tools/APITools';
import { library as libraryManager } from 'dataManagement';
import { getDeleteModalTitle, getSelectedItemIdsGrouped } from '../tools';
import styles from '../../Library.module.scss';

type DeleteLibraryItemsProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  libraryId: GlobalLibrary['id'];
};

export const DeleteLibraryItems: FC<DeleteLibraryItemsProps> = ({
  visible,
  onClose,
  onFinish,
  libraryId,
}) => {
  const onDelete = useCallback(() => {
    libraryManager
      .deleteGlobalLibraryFolders(getSelectedItemIdsGrouped())
      .then(() => {
        notifyUser.ok(uiText('library', 'itemsDeleteOk'));
        onFinish();
      })
      .catch(showAPIError(uiText('library', 'itemsDeleteError')));
  }, [onFinish]);

  return (
    <NotificationModal
      title={`Do you really want to delete ${getDeleteModalTitle(libraryId)}?`}
      isVisible={visible}
      type={ModalTypes.Warning}
      buttonsConfig={[
        {
          id: 'deleteBtn',
          key: 'delete',
          text: 'Delete',
          action: onDelete,
          type: 'primary',
          danger: true,
        },
        {
          id: 'cancelBtn',
          key: 'cancel',
          text: 'Cancel',
          action: onClose,
          className: styles.actionButton,
          type: 'ghost',
        },
      ]}
    />
  );
};
