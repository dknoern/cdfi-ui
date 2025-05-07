import React, { FC } from 'react';
import { Metric } from 'types';
import { EditButtonsLine } from './EditButtonsLine';

type EditMetricsLineProps = {
  selectedMetricIds: Metric['id'][];
};

export const EditMetricsLine: FC<EditMetricsLineProps> = ({
  selectedMetricIds,
  children,
}) => {
  const textHelper = selectedMetricIds.length
    ? `${selectedMetricIds.length} Metrics selected`
    : 'Select metrics';

  return <EditButtonsLine textHelper={textHelper}>{children}</EditButtonsLine>;
};
