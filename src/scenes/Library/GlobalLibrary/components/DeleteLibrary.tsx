import React, { FC, useCallback } from 'react';
import { GlobalLibrary } from 'types/libraryViews';
import { VoidFn } from 'types';
import { ModalTypes } from 'constants/ui';
import { NotificationModal } from 'modals';
import { deleteLibrary } from '../tools';
import styles from './DeleteLibrary.module.scss';

type DeleteLibraryProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  library: { id: GlobalLibrary['id']; name: GlobalLibrary['name'] };
};

export const DeleteLibrary: FC<DeleteLibraryProps> = ({
  visible,
  onClose,
  onFinish,
  library,
}) => {
  const handleDelete = useCallback(() => {
    deleteLibrary(library.id, onFinish);
  }, [onFinish, library.id]);

  return (
    <NotificationModal
      title={`Do you really want to delete '${library.name}'?`}
      isVisible={visible}
      type={ModalTypes.Warning}
      buttonsConfig={[
        {
          id: 'deleteBtn',
          key: 'delete',
          text: 'Delete',
          action: handleDelete,
          type: 'primary',
          danger: true,
        },
        {
          id: 'cancelBtn',
          key: 'cancel',
          text: 'Cancel',
          action: onClose,
          className: styles.cancelBtn,
          type: 'ghost',
        },
      ]}
    />
  );
};
