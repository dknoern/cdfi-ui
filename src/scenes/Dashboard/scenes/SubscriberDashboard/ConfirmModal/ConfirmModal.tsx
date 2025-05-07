import React, { FC } from 'react';
import { Button, Modal } from 'antd';
import { subscriberStore } from '../../../../../store';
import styles from './ConfirmModal.module.scss';

export interface IProps {
  visible: boolean;
  onClose: VoidFunction;
  setDelete: (subscriptionId: number | null | undefined) => void;
  id: number | null;
  text?: string;
}

export const ConfirmModal: FC<IProps> = (props: IProps) => {
  const { setIsConfirmModal } = subscriberStore;
  const onDeleteSubscription = (e: React.MouseEvent<HTMLElement>): void => {
    props.setDelete(props.id);
    setIsConfirmModal(false);
  };

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onClose}
      footer={null}
      centered
      closable
      width={450}
    >
      <div className={styles.wrapperModal}>
        <h2 className={styles.title}>Confirm</h2>
        <p className={styles.text}>
          {props.text
            ? props.text
            : 'Do you really want to delete this subscription?'}
        </p>
        <Button className={styles.button} onClick={onDeleteSubscription}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
