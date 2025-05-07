import { GlobalMetric, Metric } from 'types';
import { SelectedMetric } from 'forms/PortfolioSetup/types';

export const formatSelectedMetrics = (
  selectedIds: Metric['id'][],
  metrics: GlobalMetric[],
): SelectedMetric[] => {
  return metrics.filter((metric) => selectedIds.includes(metric.id));
};
