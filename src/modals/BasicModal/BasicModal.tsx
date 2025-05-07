import React, { FC, ReactNode } from 'react';
import { Modal } from 'antd';
import { VoidFn, WithClass } from 'types';
import { MODAL_WIDTH } from 'constants/ui';
import styles from './BasicModal.module.scss';

type BasicModalProps = {
  visible: boolean;
  title: string;
  onCancel: VoidFn;
  width?: MODAL_WIDTH;
  footer?: ReactNode | null;
  closable?: boolean;
  zIndex?: number;
} & WithClass;

export const BasicModal: FC<BasicModalProps> = ({
  visible,
  onCancel,
  title,
  width = MODAL_WIDTH.SMALL,
  footer = null,
  children,
  closable = false,
  className,
  zIndex,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={title}
      wrapClassName={`${styles.modalWrap} ${className || ''}`}
      footer={footer}
      destroyOnClose
      centered
      closable={closable}
      width={width}
      zIndex={zIndex}
    >
      {children}
    </Modal>
  );
};
