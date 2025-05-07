import React, { FC } from 'react';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from '../Popover.module.scss';

type DeleteProps = {
  disabled: boolean;
  onClick: VoidFn;
  text?: string;
  style?: string;
};

export const Delete: FC<DeleteProps> = ({
  disabled,
  onClick,
  text = 'Delete',
  style = styles.button
}) => {
  return (
    <Button
      id="deleteButton"
      disabled={disabled}
      onClick={onClick}
      type="primary"
      size="middle"
      icon={<DeleteFilled className={styles.buttonIcon} />}
      className={style}
    >
      {text}
    </Button>
  );
};
