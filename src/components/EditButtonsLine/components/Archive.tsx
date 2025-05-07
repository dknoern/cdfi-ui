import React, { FC } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from '../Popover.module.scss';

type ArchiveProps = {
  isDisabled: boolean;
  onSubmit: VoidFn;
};

export const Archive: FC<ArchiveProps> = ({ isDisabled, onSubmit }) => {
  return (
    <Button
      id="archiveButton"
      disabled={isDisabled}
      onClick={onSubmit}
      type="primary"
      size="middle"
      icon={<DeleteOutlined className={styles.buttonIcon} />}
    >
      Archive
    </Button>
  );
};
