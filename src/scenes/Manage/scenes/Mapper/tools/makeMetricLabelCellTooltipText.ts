import { Metric } from 'types';
import { isTextLong, metricTypeCheckers } from 'tools';

export const makeMetricLabelCellTooltipText = (
  metric: Metric,
): string | undefined => {
  const isMetricNameLong = isTextLong(metric.name);
  const isTextMetric = metricTypeCheckers.isTextMetric(metric);
  let result = '';

  if (!isMetricNameLong && !isTextMetric) return result;
  if (isMetricNameLong) result += metric.name;

  if (!isTextMetric) return result;

  if (isMetricNameLong) result += ': ';
  result += metric.typeConfig?.question;

  return result || undefined;
};
