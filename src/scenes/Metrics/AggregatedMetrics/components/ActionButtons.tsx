import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, EditFilled, DeleteOutlined } from '@ant-design/icons';
import { VoidFn } from 'types/misc';
import styles from '../AggregatedMetrics.module.scss';

interface FnProps {
  startAddMetric: VoidFn;
  startEditMetric: VoidFn;
  startDeleteMetric: VoidFn;
  selectedMetricKeys: React.Key[];
}
export const makeActionButtons = ({
  startAddMetric,
  startEditMetric,
  startDeleteMetric,
  selectedMetricKeys,
}: FnProps): React.ReactNode[] => {
  return [
    <Button
      key="createNew"
      type="default"
      icon={<PlusOutlined className={styles.addMetricButtonIcon} />}
      className={styles.addMetricButton}
      onClick={startAddMetric}
      id="newMetricBtn"
      disabled={selectedMetricKeys.length > 0}
    >
      Create Aggregated Metric
    </Button>,
    <Button
      key="editBtn"
      type="primary"
      icon={<EditFilled className={styles.addMetricButtonIcon} />}
      onClick={startEditMetric}
      id="editMetricBtn"
      disabled={selectedMetricKeys.length !== 1}
    >
      Edit Aggregated Metric
    </Button>,
    <Button
      key="deleteBtn"
      type="primary"
      icon={<DeleteOutlined className={styles.addMetricButtonIcon} />}
      onClick={startDeleteMetric}
      id="deleteMetricBtn"
      disabled={selectedMetricKeys.length === 0}
    >
      Delete Aggregated Metric
    </Button>,
  ];
};
