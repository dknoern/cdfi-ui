import React, { FC, useCallback, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { typography } from 'constants/typography';
import { VoidFn } from 'types';
import styles from './DownloadButton.module.scss';

const { download } = typography('common');
type DownloadButtonProps = {
  onClick: VoidFn;
};

export const DownloadButton: FC<DownloadButtonProps> = ({ onClick }) => {
  const [isLoading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    setLoading(true);
    onClick();
    setLoading(false);
  }, [onClick]);

  return (
    <Button type="link" onClick={handleClick} loading={isLoading}>
      <DownloadOutlined className={styles.downloadIcon} />
      {download}
    </Button>
  );
};
