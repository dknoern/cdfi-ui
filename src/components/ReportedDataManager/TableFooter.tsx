import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './ReportedDataManager.module.scss';

type TableFooterProps = {
  onCancel: () => void;
};
export const TableFooter: FC<TableFooterProps> = ({ onCancel }) => {
  return (
    <div className={styles.footer}>
      <Button
        key="cancelBtn"
        type="default"
        onClick={onCancel}
        className={styles.cancelBtn}
      >
        Cancel
      </Button>
      <Button
        key="actionBtn"
        type="primary"
        className={styles.actionBtn}
        htmlType="submit"
      >
        Save
      </Button>
    </div>
  );
};
