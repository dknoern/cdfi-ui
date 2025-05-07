import React, { FC } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from '../Popover.module.scss';

type EditProps = {
  disabled: boolean;
  onClick: VoidFn;
  text?: string;
};

export const Edit: FC<EditProps> = ({ disabled, onClick, text = 'Edit' }) => {
  return (
    <Button
      id="editButton"
      disabled={disabled}
      onClick={onClick}
      type="primary"
      size="middle"
      icon={<EditFilled className={styles.buttonIcon} />}
      className={styles.button}
    >
      {text}
    </Button>
  );
};
