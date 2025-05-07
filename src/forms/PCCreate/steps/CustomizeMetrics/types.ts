import { AssignedMetric, Metric } from 'types';

export type FormResult = (Omit<AssignedMetric, 'status'> & {
  isNew?: boolean;
  key: Metric['id'];
})[];
