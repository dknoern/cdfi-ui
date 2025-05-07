import React, {FC, useEffect} from 'react';
import styles from "./EmailLog.module.scss";
import {Modal} from "antd";
import {VoidFn} from "../../../../../../types";
import {systemEmailStore} from "../../../../../../store";
import {CheckCircleFilled} from "@ant-design/icons";
import {format} from "date-fns";

export interface IProps {
  visible: boolean;
  onClose: VoidFn;
}

export const EmailLogDetailsModal: FC<IProps> = (props: IProps) => {
  const {emailLogDetails, emailCategories, getEmailCategories} = systemEmailStore;

  useEffect(() => {
    getEmailCategories();
  }, [])

  const getCurrentEmailCategories = () => {
    return emailCategories.filter((item) => {
      if(item.id === emailLogDetails?.emailCategoryId) {
        return item;
      }
    })
  }

  const choosePeriod =  emailLogDetails?.isBeforeDate && emailLogDetails?.numberOfDays === 0 ? 'On' : !emailLogDetails?.isBeforeDate ? 'After' : 'Before';
  const sendingPeriod = emailLogDetails?.numberOfDays === 0 ? 'On date' : `${emailLogDetails?.numberOfDays} day(s) ${choosePeriod.toLowerCase()}`;

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onClose}
      footer={null}
      centered
      closable
      width={650}
      wrapClassName={styles.wrapperCloseModal}
      maskStyle={{zIndex: '1010'}}
    >
      <div className={styles.wrapperModal}>
        <h2 className={styles.title}>Email Details</h2>
        <div className={styles.items}>
          <div className={styles.additionalInfoWrapper}>
              <div className={emailLogDetails?.isEnabled ? styles.dueTypeOK : styles.dueTypeNone}>
                <p className={styles.additionalInfoName}>Enabled:</p>
                <CheckCircleFilled />
              </div>
          </div>
          {emailLogDetails?.code &&
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Code:</p>
            <p className={styles.itemInfo}>{emailLogDetails?.code}</p>
          </div> 
          }
          {emailLogDetails?.recipientGroup &&
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Recipient Group:</p>
            <p className={styles.itemInfo}>{emailLogDetails?.recipientGroup}</p>
          </div>
          }
          {emailLogDetails?.dependentOn?.description &&
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Dependent on:</p>
            <p className={styles.itemInfo}>{emailLogDetails?.dependentOn?.description}</p>
          </div>
          }
          {emailLogDetails?.emailCategoryId &&
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Email Category:</p>
            <p className={styles.itemInfo}>{getCurrentEmailCategories()[0]?.name}</p>
          </div> 
          }
          {emailLogDetails?.subject &&
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Subject:</p>
            <p className={styles.itemInfo}>{emailLogDetails?.subject}</p>
          </div>
          }
          {emailLogDetails?.numberOfDays || emailLogDetails?.numberOfDays == 0 ?
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Sending Period:</p>
            <p className={styles.itemInfo}>{sendingPeriod}</p>
          </div> : null
          }
          {emailLogDetails?.triggerType?.description &&
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Date:</p>
            <p className={styles.itemInfo}>{emailLogDetails?.triggerType?.description}</p>
          </div>
          }
          {emailLogDetails?.bccEmailList && emailLogDetails?.bccEmailList?.length !== 0 ?
            <div className={styles.itemWrapper}>
              <p className={styles.itemName}>BCC Emails:</p>
              <p className={styles.itemInfo}>{emailLogDetails?.bccEmailList?.join(', ')}</p>
            </div> : null
          }
          {emailLogDetails?.ccEmailList && emailLogDetails?.ccEmailList?.length !== 0 ?
            <div className={styles.itemWrapper}>
              <p className={styles.itemName}>CC Emails:</p>
              <p className={styles.itemInfo}>{emailLogDetails?.ccEmailList?.join(', ')}</p>
            </div> : null
          }
          {emailLogDetails?.lastUpdated &&
            <div className={styles.itemWrapper}>
              <p className={styles.itemName}>Last Updated:</p>
              <p className={styles.itemInfo}>{format(new Date(emailLogDetails?.lastUpdated), 'P')}</p>
            </div>
          }
          {emailLogDetails?.lastUpdatedBy && 
          <div className={styles.itemWrapper}>
            <p className={styles.itemName}>Updated By:</p>
            <p className={styles.itemInfo}>{emailLogDetails?.lastUpdatedBy}</p>
          </div> 
          }
        </div>
      </div>
    </Modal>
  )
}
