import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styles from './ActivityConfirmationModal.module.scss';
import { Button, Modal } from 'antd';
import { userStore } from 'store';

type ActivityConfirmationModalProps = {
  visible: boolean;
  onOkClick: () => void;
};

const ActivityConfirmationModalFn: FC<ActivityConfirmationModalProps> = (
props: ActivityConfirmationModalProps
) => {

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
const getTime = (deadline: number)=>{
  const time = Math.floor(+new Date(deadline)) - Math.floor(+new Date() / 1000);
  setMinutes(Math.floor((time / 60) % 60));
  setSeconds(Math.floor((time) % 60));
};

  useEffect(() => {
    const timer:any = setInterval(() => {
      getTime(userStore.exp);
      const leftToExp = Math.floor(+new Date(userStore.exp)) - Math.floor(+new Date() / 1000);

      if(leftToExp <= 0) {
        userStore.resetUser();
        userStore.setRefreshTokenModalVisibility(false);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
      <Modal
        visible={props.visible}
        footer={null}
        centered
        closable={false}
        width={480}
        wrapClassName={styles.wrapperCloseModal}
        maskClosable={false}
        maskStyle={{zIndex: '1050'}}
      >
        <div className={styles.wrapperModal}>
          <p className={styles.text} >Are you still here?</p>
          {minutes>=0 || seconds>=0 ?
          <p className={styles.text} >You will be logged out in {minutes}:{seconds<10? '0':null}{seconds} minutes</p>: null
          }
          <Button
            className={styles.button}
            onClick={props.onOkClick}
          >Yes, I'm here</Button>
        </div>
      </Modal>
    )
};

export const ActivityConfirmationModal = observer(ActivityConfirmationModalFn);
