import { Metric, MetricType } from 'types';

type MetricCheckedFields = {
  type: Metric['type'];
  typeConfig?: Metric['typeConfig'];
};

type MetricCheckerFn = (metric: MetricCheckedFields) => boolean;

const isMetricOfType = (
  metric: MetricCheckedFields,
  type: MetricType,
): boolean => metric.type === type || metric.typeConfig?.type === type;

const isTextMetric: MetricCheckerFn = (metric) =>
  isMetricOfType(metric, MetricType.TEXT);

const isNumericMetric: MetricCheckerFn = (metric) =>
  isMetricOfType(metric, MetricType.NUMERIC);

export const metricTypeCheckers = {
  isTextMetric,
  isNumericMetric,
};
