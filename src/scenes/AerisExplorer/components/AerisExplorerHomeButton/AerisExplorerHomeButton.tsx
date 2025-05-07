import React from 'react';
import { observer } from 'mobx-react';
import { aerisExplorerPeerGroupStore } from 'store';
import { Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './AerisExplorerHomeButton.module.scss';

type AerisExplorerHomeButtonProps = {
  alternateText?: string;
};

export const AerisExplorerHomeButton = observer(
  ({ alternateText }: AerisExplorerHomeButtonProps) => {
    const { aerisExplorerHomePath } = aerisExplorerPeerGroupStore;

    return (
      <Button icon={<CaretLeftOutlined />} className={styles.homeButton}>
        <Link className={styles.lightBlue} to={aerisExplorerHomePath}>
          {alternateText || 'Back to Aeris® Explorer Homepage'}
        </Link>
      </Button>
    );
  },
);
