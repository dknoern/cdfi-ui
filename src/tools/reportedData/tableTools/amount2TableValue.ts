import { MetricNumericFormat, MetricTypeConfig4Numeric } from 'types/metric';
import { formatNumberWithCommas } from '../formatNumberWithCommas';

export const amount2TableValue = (
  value: number,
  metricTypeConfig: MetricTypeConfig4Numeric,
): string => {
  let result = formatNumberWithCommas(
    Math.abs(value).toFixed(metricTypeConfig.decimals),
  );

  if (metricTypeConfig.format === MetricNumericFormat.DOLLAR) {
    result = `$${result}`;
  } else if (metricTypeConfig.format === MetricNumericFormat.PERCENTAGE) {
    result = `${result}%`;
  }
  if (value < 0) {
    result = `(${result})`;
  }

  return result;
};
