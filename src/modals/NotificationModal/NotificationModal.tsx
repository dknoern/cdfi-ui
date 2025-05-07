import React, { FC, useMemo, ReactNode } from 'react';
import { Modal, Button, Typography, Row, Col } from 'antd';
import { ModalTypes } from 'constants/ui';
import Paragraph from 'antd/lib/typography/Paragraph';
import { ButtonConfig } from './types';
import { getIcon, getModalClassName } from './tools';
import styles from './NotificationModal.module.scss';

const { Title } = Typography;

type NotificationModalProps = {
  type: ModalTypes;
  isVisible: boolean;
  title: ReactNode;
  buttonsConfig: ButtonConfig[];
};

export const NotificationModal: FC<NotificationModalProps> = ({
  type,
  isVisible,
  title,
  buttonsConfig,
  children,
}) => {
  const icon = useMemo(() => {
    return getIcon(type);
  }, [type]);

  const modalClassName = useMemo(() => {
    return getModalClassName(type);
  }, [type]);

  return (
    <Modal
      title={
        <Row className={styles.titleRow}>
          <Col span={24}>
            <Title>Confirm</Title>
            <Paragraph>{title}</Paragraph>
          </Col>
        </Row>
      }
      visible={isVisible}
      closable={false}
      footer={buttonsConfig.map((config) => (
        <Button
          id={config.id}
          key={config.key}
          onClick={config.action}
          type={config.type}
          className={config.className ?? ''}
          danger={config.danger}
        >
          {config.text}
        </Button>
      ))}
      centered
      className={modalClassName}
    >
      {children}
    </Modal>
  );
};
