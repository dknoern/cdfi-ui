import React from 'react';
import { Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './Instructions.module.scss';

export const CreateComparisonReportToggleInstructions = () => {
  return (
    <Typography.Paragraph>
      Use the toggle to switch from the median to the bar graph view, or vice versa:
    </Typography.Paragraph>
  );
};

export const MedianViewToolTip = () => (
  <Tooltip
    placement="left"
    title="The Median View : in this view you will see the median KPI of the
              portfolio segment against the bottom, median, and top quartiles of
              the peer group."
  >
    <InfoCircleOutlined
      className={`${styles.smallMarginTop} ${styles.lightGray}`}
    />
  </Tooltip>
);

export const BarGraphViewToolTip = () => (
  <Tooltip
    placement="left"
    title="The CDFI Bar Graph View : in this view you will see the
              performance of each CDFI in your portfolio segment against the
              bottom, median and top quartiles of the peer group."
  >
    <InfoCircleOutlined
      className={`${styles.smallMarginTop} ${styles.lightGray}`}
    />
  </Tooltip>
);

export const medianViewLabel = (
  <div className={styles.toggleLabel}>
    <p className={styles.lightBlue}>Median View</p>
    <p className={`${styles.lightGray} ${styles.smallMarginLeft}`}>
      – median KPI of portfolio segment against peer group median and quartiles
    </p>
  </div>
);

export const barGraphViewLabel = (
  <div className={styles.toggleLabel}>
    <p className={styles.lightBlue}>Bar Graph</p>
    <p className={`${styles.lightGray} ${styles.smallMarginLeft}`}>
      – bar graph of individual portfolio segment CDFIs KPI against peer group
      quartiles
    </p>
  </div>
);
