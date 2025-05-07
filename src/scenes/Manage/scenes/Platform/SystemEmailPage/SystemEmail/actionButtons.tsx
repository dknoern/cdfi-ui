import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from 'components/ManageTableStyles.module.scss';

export const actionButtons = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="goToBack"
    onClick={onAddClick}
    type="primary"
    icon={<ArrowLeftOutlined />}
    className={styles.actionButton}
  >
    Go Back
  </Button>,
];
