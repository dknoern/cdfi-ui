import React, { FC } from 'react';
import { Metric } from 'types';
import { renderWithTooltip } from 'tools/renderHelpers';
import { StatusMarker } from './StatusMarker';
import styles from './MetricName.module.scss';

type Props = {
  metric: Metric;
  showStatusIcon?: boolean;
};

export const MetricName: FC<Props> = ({ metric, showStatusIcon = false }) => {
  return (
    <div className={styles.metric}>
      {renderWithTooltip(metric.name, metric.typeConfig?.question)}
      {showStatusIcon && !!metric.status && (
        <StatusMarker status={metric.status} />
      )}
    </div>
  );
};
