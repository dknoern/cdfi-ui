import React, { FC } from 'react';
import { Button } from 'antd';
import { VoidFn } from 'types';
import { typography } from 'constants/typography';
import { BasicModal } from 'modals/BasicModal';
import styles from './InstructionsModal.module.scss';

const { instructionsText } = typography('mapper');

type InstructionsModalProps = {
  visible: boolean;
  onCancel: VoidFn;
};

export const InstructionsModal: FC<InstructionsModalProps> = ({
  visible,
  onCancel,
}) => {
  return (
    <BasicModal
      title="Mapper Instructions"
      visible={visible}
      onCancel={onCancel}
      footer={
        <Button onClick={onCancel} type="primary">
          Cancel
        </Button>
      }
      className={styles.modal}
    >
      {instructionsText}
    </BasicModal>
  );
};
