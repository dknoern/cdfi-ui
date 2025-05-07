import { MetricSharePeriod } from 'types';

export type MetricSharePeriodNames = {
  [key in keyof typeof MetricSharePeriod]: string;
};

export const metricSharePeriodNames: MetricSharePeriodNames = {
  [MetricSharePeriod.QUARTERLY]: 'Quarterly',
  [MetricSharePeriod.ANNUALLY]: 'Annually',
};
