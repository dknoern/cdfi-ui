import { MetricType, MetricNumericFormat, MetricTypeConfig } from 'types';

export type MetricTypeNames = {
  [key in keyof typeof MetricType]: string;
};

export const metricTypeNames: MetricTypeNames = {
  [MetricType.NUMERIC]: 'Numeric',
  [MetricType.TEXT]: 'Text',
  [MetricType.BOTH]: 'Both',
};

export const metricTypeConfigDefault: MetricTypeConfig = {
  type: MetricType.NUMERIC,
  format: MetricNumericFormat.NUMBER,
  decimals: 2,
  dateFormat: 'M/D/YYYY',
};
