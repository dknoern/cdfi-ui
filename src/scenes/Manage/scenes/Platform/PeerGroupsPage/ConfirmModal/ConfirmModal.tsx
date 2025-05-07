import React, { FC } from 'react';
import { Button, Modal } from 'antd';
import { VoidFn } from 'types';
import styles from './ConfirmModal.module.scss';

export interface ConfirmModalProps {
  visible: boolean;
  onClose: VoidFn;
  onClick: VoidFn;
  text: string;
  buttonText: string;
  closeConfirmationButtonText?: string;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onClick,
  text,
  buttonText,
  closeConfirmationButtonText,
}: ConfirmModalProps) => (
  <Modal
    visible={visible}
    onCancel={onClose}
    footer={null}
    centered
    closable
    width={450}
    wrapClassName={styles.wrapperCloseModal}
    maskClosable={false}
    maskStyle={{ zIndex: '1010' }}
  >
    <div className={styles.wrapperModal}>
      <h2 className={styles.title}>Confirm</h2>
      <p className={styles.text}>{text}</p>
      <Button className={styles.button} onClick={onClick}>
        {buttonText}
      </Button>
      {closeConfirmationButtonText && (
        <Button className={styles.button} onClick={onClose}>
          {closeConfirmationButtonText}
        </Button>
      )}
    </div>
  </Modal>
);
