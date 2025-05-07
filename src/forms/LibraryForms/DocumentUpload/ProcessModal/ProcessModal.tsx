import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { VoidFn } from 'types';
import { NotificationModal } from 'modals';
import { ButtonConfig } from 'modals/NotificationModal/types';
import { ModalTypes } from 'constants/ui';
import { ModalTexts } from './types';
import { uiText4ProcessModal } from './constants';
import {
  detectFileUploadStatus,
  getGotItBtnConfig,
  getDownloadBtnConfig,
} from './tools';
import styles from './ProcessModal.module.scss';

const { Text } = Typography;

type ProcessModalProps = {
  type: ModalTypes;
  onOk: VoidFn;
  onDownload: VoidFn;
  isFileErrorCase: boolean;
  texts?: Partial<ModalTexts>;
};

export const ProcessModal: FC<ProcessModalProps> = ({
  type,
  onOk,
  onDownload,
  isFileErrorCase = false,
  texts,
}) => {
  const uiText = useMemo(() => {
    const fileUploadStatus = detectFileUploadStatus(type, isFileErrorCase);

    const info = uiText4ProcessModal[fileUploadStatus] as ModalTexts;

    return texts ? { ...info, ...texts } : info;
  }, [type, isFileErrorCase, texts]);

  const buttonsConfig = useMemo<ButtonConfig[]>((): ButtonConfig[] => {
    const gotItBtnConfig = getGotItBtnConfig(onOk);
    const downloadBtnConfig = getDownloadBtnConfig(onDownload);

    return isFileErrorCase
      ? [downloadBtnConfig, gotItBtnConfig]
      : [gotItBtnConfig];
  }, [onDownload, onOk, isFileErrorCase]);

  return (
    <NotificationModal
      title={uiText.title}
      type={type}
      isVisible
      buttonsConfig={buttonsConfig}
    >
      {/* <Text className={styles.description}>{uiText.description}</Text>
      <Text className={styles.instructions}>{uiText.instructions}</Text> */}
    </NotificationModal>
  );
};
