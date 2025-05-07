import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from 'components/ManageTableStyles.module.scss';

export const actionButtons = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="addNewUserButton"
    onClick={onAddClick}
    type="default"
    icon={<PlusOutlined />}
    className={styles.actionButton}
  >
    Create New User
  </Button>,
];
