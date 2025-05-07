import React, {FC} from "react";
import {Button, Modal} from "antd";
import {VoidFn} from "types";
import { useHistory } from 'react-router-dom';
import styles from "./CancelConfirmModal.module.scss";

export interface IProps {
  visible: boolean;
  onClose: VoidFn;
}

export const CancelConfirmModal: FC<IProps> = (props: IProps) => {
  const history = useHistory();

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
        <p className={styles.text} >Do you really want to cancel? All data entered will be lost.</p>
        <Button
          className={styles.button}
          onClick={() => (history.push('/dashboard'))}
        >Yes</Button>
      </div>
    </Modal>
  )
}
