import React, { FC } from 'react';
import styles from './EmailLog.module.scss';
import { Modal } from 'antd';
import { VoidFn } from '../../../../../../types';
import { autoEmailStore } from '../../../../../../store';
import Parser from 'html-react-parser';

export interface IProps {
  visible: boolean;
  onClose: VoidFn;
}

export const EmailLogDetailsModal: FC<IProps> = (props: IProps) => {
  const { emailLog } = autoEmailStore;

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onClose}
      footer={null}
      centered
      closable
      width={650}
      wrapClassName={styles.wrapperCloseModal}
      maskStyle={{ zIndex: '1010' }}
    >
      <div className={styles.wrapperModal}>
        <h2 className={styles.title}>Email Details</h2>
        <div className={styles.items}>
          <div className={styles.additionalInfoWrapper}>
            {Parser(autoEmailStore.emailLogDetails)}
          </div>
        </div>
      </div>
    </Modal>
  );
};
