import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from 'components/ManageTableStyles.module.scss';

export const emailAerisSupportButton = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="emailAerisSupportButton"
    onClick={onAddClick}
    type="default"
    icon={<PlusOutlined />}
    className={styles.actionButton}
    key='emailAerisSupportButton'
  >
    Email Aeris Support
  </Button>,
];