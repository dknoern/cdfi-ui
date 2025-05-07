import { metricSharePeriodNames } from 'constants/metricSharePeriod';
import { MetricSharePeriod } from 'types';

export const frequencyOptions = Object.keys(MetricSharePeriod).map((key) => ({
  key,
  value: key,
  label: metricSharePeriodNames[key as MetricSharePeriod],
}));

export const initialValues = {
  name: '',
  frequency: undefined,
  description: '',
};
