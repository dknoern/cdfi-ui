import React, { FC } from 'react';
import { Modal, Button } from 'antd';
import { VoidFn } from 'types/misc';
import styles from './EditModal.module.scss';

type EditModalProps = {
  formId: string;
  visible: boolean;
  title?: string;
  onCancel: VoidFn;
  isProcessing?: boolean;
  forceRender?: boolean;
};

export const EditModal: FC<EditModalProps> = ({
  formId,
  children,
  visible,
  title,
  onCancel,
  isProcessing,
  forceRender = false,
}) => {
  return (
    <Modal
      visible={visible}
      centered
      onCancel={onCancel}
      title={title}
      wrapClassName={styles.modal}
      forceRender={forceRender}
      destroyOnClose
      width="80%"
      footer={
        <Button
          type="primary"
          htmlType="submit"
          form={formId}
          className={styles.saveBtn}
          loading={isProcessing}
        >
          Save Changes
        </Button>
      }
    >
      {children}
    </Modal>
  );
};
