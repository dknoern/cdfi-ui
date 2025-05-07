import React, {FC} from 'react';
import { Button, Drawer } from 'antd';
import {CheckCircleFilled} from "@ant-design/icons";
import {VoidFn} from "../../../types";
import { userStore } from 'store';
import {CurrentUserType} from "./Profile";
import {authTools} from "../../../tools";
import styles from "./ProfileModal.module.scss";

export interface IProps {
  visible: boolean;
  onClose: VoidFn;
  onClick: VoidFn;
  userData: CurrentUserType
}

export const ProfileModal : FC<IProps> = (props: IProps) => {
  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      footer={null}
      drawerStyle={{ top: 80  }}
      maskStyle={{ background: 'none' }}
      width={315}
      className={styles.wrapperModal}
    >
      <div className={styles.wrapperModal}>
        <div className={styles.mainInfo}>
          <div className={styles.avatar}>
            <p>{props.userData.firstName.substr(0,1).toUpperCase()}</p>
          </div>
          <p className={styles.name}>{props.userData.firstName} {props.userData.lastName}</p>
          <p className={styles.email}>{props.userData.email}</p>
        </div>
       <div className={styles.items}>
         <div className={styles.itemWrapper}>
           <p className={styles.itemName}>Username</p>
           <p className={styles.itemInfo}>{props.userData.username}</p>
         </div>
         <div className={styles.itemWrapper}>
           <p className={styles.itemName}>First Name</p>
           <p className={styles.itemInfo}>{props.userData.firstName}</p>
         </div>
         <div className={styles.itemWrapper}>
           <p className={styles.itemName}>Last Name</p>
           <p className={styles.itemInfo}>{props.userData.lastName}</p>
         </div>
         {props.userData.title ? <div className={styles.itemWrapper}>
           <p className={styles.itemName}>Job Title</p>
           <p className={styles.itemInfo}>{props.userData.title}</p>
         </div> : null}

         {props.userData.phone ? <div className={styles.itemWrapper}>
           <p className={styles.itemName}>Phone</p>
           <p className={styles.itemInfo}>{props.userData.phone}</p>
         </div> : null}
         {props.userData.phoneExtension ? <div className={styles.itemWrapper}>
           <p className={styles.itemName}>Extension</p>
           <p className={styles.itemInfo}>{props.userData.phoneExtension}</p>
         </div> : null}
       </div>
        <div className={styles.additionalInfoWrapper}>
          {userStore.isCdfi ?
            <div className={props.userData.uploadReminders ? styles.dueTypeOK : styles.dueTypeNone}>
              <p className={styles.additionalInfoName}>Upload Reminders</p>
              <CheckCircleFilled />
            </div>
            : null}

          {userStore.isSubscriber ?
            <>
              <div className={props.userData.emailReminders ? styles.dueTypeOK : styles.dueTypeNone}>
                <p className={styles.additionalInfoName}>Subscription Reminders </p>
                <CheckCircleFilled />
              </div>
              <div className={props.userData.newFinancialReminders ? styles.dueTypeOK : styles.dueTypeNone}>
                <p className={styles.additionalInfoName}>New Financial Reminders  </p>
                <CheckCircleFilled />
              </div>
            </>
            : null
          }
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            className={styles.button}
            onClick={props.onClick}
          >
            Edit Profile
          </Button>
          <Button
            className={styles.button}
            onClick={(): void => {
              authTools.logout();
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
