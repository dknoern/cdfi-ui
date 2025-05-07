import React, { FC } from 'react';
import { VoidFn } from 'types';
import { ModalTypes } from 'constants/ui';
import { uiText } from 'constants/uiText';
import { NotificationModal } from 'modals';

type BatchDeleteProps = {
  visible: boolean;
  onClose: VoidFn;
  onConfirm: VoidFn;
  confirmText?: string;
};

export const BatchDelete: FC<BatchDeleteProps> = ({
  visible,
  onClose,
  onConfirm,
  confirmText = uiText('general', 'batchDeleteConfirm'),
}) => {
  return (
    <NotificationModal
      title={confirmText}
      isVisible={visible}
      type={ModalTypes.Warning}
      buttonsConfig={[
        {
          id: 'deleteBtn',
          key: 'delete',
          text: 'Delete',
          action: onConfirm,
          type: 'primary',
          danger: true,
        },
        {
          id: 'cancelBtn',
          key: 'cancel',
          text: 'Cancel',
          action: onClose,
          type: 'ghost',
        },
      ]}
    />
  );
};
