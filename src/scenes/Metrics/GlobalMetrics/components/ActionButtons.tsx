import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, EditFilled } from '@ant-design/icons';
import { VoidFn } from 'types/misc';
import { OutlineButton } from 'components';

import styles from '../Metrics.module.scss';

interface FnProps {
  sidebarOpen: boolean;
  openSidebar: VoidFn;
  closeSidebar: VoidFn;
  startAddMetric: VoidFn;
  startEditMetric: VoidFn;
  selectedMetricKeys: React.Key[];
}
export const makeActionButtons = ({
  sidebarOpen,
  openSidebar,
  closeSidebar,
  startAddMetric,
  startEditMetric,
  selectedMetricKeys,
}: FnProps): React.ReactNode[] => {
  return [
    sidebarOpen ? (
      <OutlineButton
        id="showMetricsBtn"
        title="Show Metrics"
        onClick={closeSidebar}
      />
    ) : (
      <OutlineButton
        id="showCategoriesBtn"
        title="Show Categories"
        onClick={openSidebar}
      />
    ),
    <Button
      key="createNew"
      type="default"
      icon={<PlusOutlined className={styles.addMetricButtonIcon} />}
      className={styles.addMetricButton}
      onClick={startAddMetric}
      id="newMetricBtn"
    >
      Create New Metric
    </Button>,
    <Button
      key="editBtn"
      type="primary"
      icon={<EditFilled className={styles.addMetricButtonIcon} />}
      onClick={startEditMetric}
      id="editMetricBtn"
      disabled={selectedMetricKeys.length !== 1}
    >
      Edit Metric
    </Button>,
  ];
};
