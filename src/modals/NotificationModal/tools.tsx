import React, { ReactNode } from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { ModalTypes } from 'constants/ui';
import styles from './NotificationModal.module.scss';

export const getIcon = (type: ModalTypes): ReactNode => {
  let Icon = CloseCircleOutlined;

  switch (type) {
    case ModalTypes.Success:
      Icon = CheckCircleOutlined;
      break;

    case ModalTypes.Warning:
      Icon = ExclamationCircleOutlined;
      break;

    case ModalTypes.Error:
      Icon = CloseCircleOutlined;
      break;

    default:
      break;
  }

  return <Icon className={styles.icon} />;
};

export const getModalClassName = (type: ModalTypes): string => {
  let additionalClassname = '';

  switch (type) {
    case ModalTypes.Success:
      additionalClassname = styles.notificationModalSuccess;
      break;

    case ModalTypes.Warning:
      additionalClassname = styles.notificationModalWarning;
      break;

    case ModalTypes.Error:
      additionalClassname = styles.notificationModalError;
      break;

    default:
      break;
  }

  return `${styles.notificationModal} ${additionalClassname}`;
};
