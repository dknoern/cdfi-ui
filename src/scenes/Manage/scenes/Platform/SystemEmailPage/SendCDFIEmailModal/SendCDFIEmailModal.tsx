import React, {FC} from "react";
import {Button, Modal} from "antd";
import {VoidFn} from "types";
import styles from "./SendCDFIEmailModal.module.scss";

export interface SendCDFIEmailModalProps {
  visible: boolean;
  onClose: VoidFn;
  onClick: VoidFn;
}

export const SendCDFIEmailModal: FC<SendCDFIEmailModalProps> = (props: SendCDFIEmailModalProps) => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onClose}
      footer={null}
      centered
      closable
      width={480}
      wrapClassName={styles.wrapperCloseModal}
      maskClosable={false}
      maskStyle={{zIndex: '1010'}}
    >
      <div className={styles.wrapperModal}>
        <h2 className={styles.title}>Confirm</h2>
        <p className={styles.text} >This will send the email to <span>all</span> CDFI users in the Cloud who have Upload Reminders checked in their profile.</p> 
        <p className={styles.text} >To see a list of CDFI recipients before sending, click Cancel, then click the “Generate Recipients List” button.</p>
        <p className={styles.text} >Are you sure you want to send the Upload Reminder email?</p>
        <Button
          className={styles.button}
          onClick={props.onClose}
        >Cancel</Button>
        <Button
          className={styles.button}
          onClick={props.onClick}
        >Yes</Button>
      </div>
    </Modal>
  )
}
