import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from 'components/ManageTableStyles.module.scss';

export const createReportRequestButton = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="createReportRequestButton"
    onClick={onAddClick}
    type="default"
    icon={<PlusOutlined />}
    className={styles.actionButton}
    key='createReportRequestButton'
  >
    Create Report Request
  </Button>,
];

export const launchTableauButton = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="launchTableauButton"
    onClick={onAddClick}
    type="default"
    className={styles.tableauButton}
    key='launchTableauButton'
  >
    Launch Tableau
  </Button>,
];
