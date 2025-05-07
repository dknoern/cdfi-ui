import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { ModalTypes } from 'constants/ui';
import { uiText } from 'constants/uiText';
import { NotificationModal } from 'modals';
import { notifyUser } from 'tools';
import { showAPIError } from 'tools/APITools';
import { library as libraryManager } from 'dataManagement';
import { getSelectedItemIdsGrouped } from '../FMLibrary/tools';
import styles from '../Library.module.scss';

type DeleteLibraryItemsProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  documentTypeId: number;
};

export const AerisDeleteLibraryItems: FC<DeleteLibraryItemsProps> = ({
  visible,
  onClose,
  onFinish,
  documentTypeId,
}) => {

  const onDelete = useCallback(() => {
    libraryManager
      .deleteLibraryItem(documentTypeId)
      .then(() => {
        notifyUser.ok(uiText('library', 'itemsDeleteOk'));
        onFinish();
      })
      .catch(showAPIError(uiText('library', 'itemsDeleteError')))
      .finally(() => {
        onClose();
      });
  }, [onFinish, onClose]);

  return (
    <NotificationModal
      title="Do you really want to delete this document?"
      isVisible={visible}
      type={ModalTypes.Warning}
      buttonsConfig={[
        {
          id: 'cancelBtn',
          key: 'cancel',
          text: 'Cancel',
          action: onClose,
          className: styles.actionButton,
          type: 'ghost',
        },
        {
          id: 'deleteBtn',
          key: 'delete',
          text: 'Delete',
          action: (): void => onDelete(),
          type: 'primary',
          danger: true,
        },
      ]}
    />
  );
};
