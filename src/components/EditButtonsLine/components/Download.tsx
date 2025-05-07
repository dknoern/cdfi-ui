import React, { FC } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from '../Popover.module.scss';

type DownloadProps = {
  isDisabled: boolean;
  onSubmit: VoidFn;
};

export const Download: FC<DownloadProps> = ({ isDisabled, onSubmit }) => {
  return (
    <Button
      className={styles.button}
      id="downloadButton"
      disabled={isDisabled}
      onClick={onSubmit}
      type="primary"
      size="middle"
      icon={<DownloadOutlined className={styles.buttonIcon} />}
    >
      Download
    </Button>
  );
};
