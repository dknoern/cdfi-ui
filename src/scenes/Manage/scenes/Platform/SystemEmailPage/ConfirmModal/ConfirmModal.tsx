import React, {FC} from "react";
import {Button, Modal} from "antd";
import {VoidFn} from "types";
import styles from "./ConfirmModal.module.scss";

export interface IProps {
  visible: boolean;
  onClose: VoidFn;
  onClick: VoidFn;
  text: string;
  buttonText: string;
}

export const ConfirmModal: FC<IProps> = (props: IProps) => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onClose}
      footer={null}
      centered
      closable
      width={450}
      wrapClassName={styles.wrapperCloseModal}
      maskClosable={false}
      maskStyle={{zIndex: '1010'}}
    >
      <div className={styles.wrapperModal}>
        <h2 className={styles.title}>Confirm</h2>
        <p className={styles.text} >{props.text}</p>
        <Button
          className={styles.button}
          onClick={props.onClick}
        >{props.buttonText}</Button>
      </div>
    </Modal>
  )
}
