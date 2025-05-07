import { VoidFn } from '../../../../../types';
import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from '../../../../Dashboard/scenes/SubscriberDashboard/SubscriberActivities.module.scss';

export const addFilterButton = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="addFilterButton"
    onClick={onAddClick}
    type="default"
    icon={<PlusOutlined />}
    className={styles.actionButton}
  >
    Add Filter
  </Button>,
];
