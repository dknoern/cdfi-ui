import React, { useState } from 'react';
import { Switch, Card } from 'antd';
import { BarChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { handleCompareAggregateToggle } from 'scenes/AerisExplorer/components/handleReportsPageUrlParamsChange';
import {
  CreateComparisonReportToggleInstructions,
  barGraphViewLabel,
  medianViewLabel,
  MedianViewToolTip,
  BarGraphViewToolTip,
} from 'scenes/AerisExplorer/components/Instructions/CreateComparisonInstructions';
import styles from './ComparisonChartViewToggleSwitch.module.scss';

// TODO: add copy and tooltips from original create modal
export const ComparisonChartViewToggleSwitch = () => {
  const [isBarGraph, setIsBarGraph] = useState(false);

  return (
    <Card
      title={<CreateComparisonReportToggleInstructions />}
      className={styles.displayFlexColumn}
    >
      <div className={styles.displayFlexSmallGap}>
        <Switch
          className={styles.switch}
          unCheckedChildren={<LineChartOutlined />}
          checkedChildren={<BarChartOutlined />}
          onChange={(checked) =>
            setIsBarGraph(handleCompareAggregateToggle(checked))
          }
        />
        {isBarGraph ? (
          <div className={styles.displayFlexSmallGap}>
            {barGraphViewLabel}
            <BarGraphViewToolTip />
          </div>
        ) : (
          <div className={styles.displayFlexSmallGap}>
            {medianViewLabel}
            <MedianViewToolTip />
          </div>
        )}
      </div>
    </Card>
  );
};
