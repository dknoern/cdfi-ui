import React, { FC } from 'react';
import { GraphType } from 'types/graphs';
import {
  DEFAULT_GRAPH_TYPE,
  DEFAULT_PERIODS_COUNT,
  DEFAULT_METRICS_COUNT,
  MIN_SPACE_BETWEEN_PERIODS,
  MIN_METRIC_WIDTH,
  MIN_PERIOD_WIDTH,
  MIN_ITEMS_SUM_COUNT,
  MIN_ITEMS_COUNT,
  MIN_LINE_PERIODS_COUNT,
  MIN_SPACE_BETWEEN_COLUMNS,
  MIN_STACKED_PERIODS_COUNT,
} from './constants';

type ChartWrapperProps = {
  chartType: GraphType;
  periodsCount: number;
  metricsCount: number;
};
export const ChartWrapper: FC<ChartWrapperProps> = ({
  chartType = DEFAULT_GRAPH_TYPE,
  periodsCount = DEFAULT_PERIODS_COUNT,
  metricsCount = DEFAULT_METRICS_COUNT,
  children,
}) => {
  let chartWidth;
  switch (chartType) {
    case GraphType.LINE:
      if (periodsCount > MIN_LINE_PERIODS_COUNT) {
        chartWidth =
          periodsCount *
          (MIN_SPACE_BETWEEN_COLUMNS * 2 + MIN_SPACE_BETWEEN_PERIODS);
      }
      break;
    case GraphType.COLUMN:
      if (
        metricsCount >= MIN_ITEMS_COUNT &&
        periodsCount >= MIN_ITEMS_COUNT &&
        periodsCount + metricsCount >= MIN_ITEMS_SUM_COUNT
      ) {
        chartWidth =
          periodsCount *
          (metricsCount * MIN_METRIC_WIDTH + MIN_SPACE_BETWEEN_PERIODS);
      }
      break;

    case GraphType.COLUMN_STACKED:
      if (periodsCount >= MIN_STACKED_PERIODS_COUNT) {
        chartWidth =
          periodsCount * (MIN_PERIOD_WIDTH + MIN_SPACE_BETWEEN_COLUMNS);
      }
      break;
    default:
      return <>{children}</>;
  }

  return <div style={{ height: '100%', width: chartWidth }}>{children}</div>;
};
