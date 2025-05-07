import React, { FC } from 'react';
import { Modal, Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { VoidFn } from 'types';
import { MODAL_WIDTH } from 'constants/ui';
import styles from './ModalWithForm.module.scss';

type SpecificProps = {
  formId: string;
  onCancel: VoidFn;
  actionButtonText?: React.ReactNode;
  actionButtonDisabled?: boolean;
  actionButtonLoading?: boolean;
  secondaryActionButton?: boolean;
  secondaryActionButtonVisible?: boolean;
  secondaryActionButtonText?: React.ReactNode;
  onSecondaryActionButtonClick?: VoidFn;
  cancelButtonText?: React.ReactNode;
  showCloseButton?: boolean;
  width?: MODAL_WIDTH;
  visible: boolean;
  hideActionButton?: boolean;
};
type ModalWithFormProps = Omit<ModalProps, keyof SpecificProps> & SpecificProps;

export const ModalWithForm: FC<ModalWithFormProps> = ({
  children,
  formId,
  onCancel,
  actionButtonText,
  actionButtonDisabled,
  actionButtonLoading,
  secondaryActionButton,
  secondaryActionButtonVisible,
  secondaryActionButtonText,
  onSecondaryActionButtonClick,
  cancelButtonText,
  showCloseButton = true,
  width = MODAL_WIDTH.SMALL,
  hideActionButton,
  ...rest
}) => {
  const cancelBtn = (
    <Button
      key="cancelBtn"
      htmlType="reset"
      type="default"
      onClick={onCancel}
      className={styles.cancelBtn}
    >
      {cancelButtonText || 'Cancel'}
    </Button>
  );

  const secondaryActionBtn = (
    <Button
      key="secondaryActionBtn"
      type="default"
      onClick={onSecondaryActionButtonClick}
      disabled={!secondaryActionButtonVisible}
      className={styles.actionBtn}
    >
      {secondaryActionButtonText}
    </Button>
  );

  const actionBtn = (
    <Button
      key="actionBtn"
      htmlType="submit"
      form={formId}
      type="primary"
      className={styles.actionBtn}
      loading={actionButtonLoading}
      disabled={actionButtonDisabled}
    >
      {actionButtonText || 'Submit'}
    </Button>
  );

  return (
    <Modal
      onCancel={onCancel}
      wrapClassName={styles.modalWrap}
      destroyOnClose
      centered
      closable={showCloseButton}
      width={width}
      footer={
        secondaryActionButton && hideActionButton
          ? [cancelBtn, secondaryActionBtn]
          : secondaryActionButton
          ? [cancelBtn, secondaryActionBtn, actionBtn]
          : [cancelBtn, actionBtn]
      }
      {...rest}
    >
      {children}
    </Modal>
  );
};
