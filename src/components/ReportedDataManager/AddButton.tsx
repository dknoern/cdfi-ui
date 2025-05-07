import React, { FC } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { newPeriodStore } from './newPeriodStore';
import styles from './ReportedDataManager.module.scss';

export const AddButton: FC = () => {
  return (
    <Button
      key="addNew"
      type="default"
      icon={<PlusOutlined className={styles.buttonIcon} />}
      className={styles.toggleModalButton}
      id="addBtn"
      onClick={newPeriodStore.startFlow}
    >
      Add Reporting Period
    </Button>
  );
};
