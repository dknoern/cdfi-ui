import { Metric } from './metric';

export interface AggregatedMetric {
  id: number;
  name: string;
  unitType: string;
  equationType: string;
  definition?: string;
  metrics: Metric[];
}

export type AggregatedMetricSaveData = Omit<
  AggregatedMetric,
  'id' | 'metrics'
> & {
  metricIds: number[];
};

export type AggregatedMetricUpdateData = Omit<AggregatedMetric, 'metrics'> & {
  metricIds: number[];
};
