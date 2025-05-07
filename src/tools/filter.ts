import { GlobalMetric } from 'types';
import { MetricType } from 'types/metricType';

export const onlyNumericMetrics = (metric: GlobalMetric): boolean =>
  metric.typeConfig.type === MetricType.NUMERIC;
