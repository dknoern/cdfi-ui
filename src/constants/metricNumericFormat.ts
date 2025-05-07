import { MetricNumericFormat } from 'types';

type MetricNumericFormatNames = {
  [key in keyof typeof MetricNumericFormat]: string;
};

export const metricNumericFormatNames: MetricNumericFormatNames = {
  [MetricNumericFormat.DOLLAR]: 'Currency',
  [MetricNumericFormat.NUMBER]: 'Number',
  [MetricNumericFormat.PERCENTAGE]: 'Percentage',
};
