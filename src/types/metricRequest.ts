import { MetricSharePeriod } from './metricSharePeriod';
import { Metric } from './metric';
import { MetricRequestStatus } from './metricRequestStatus';

export type RequiredMetric = { metric: Metric; period: MetricSharePeriod };
export interface MetricRequest {
  id: number;
  requester: {
    id: number;
    name: string;
  };
  requestDate: number;
  requiredMetrics: RequiredMetric[];
  requiredMetricsNumber: number;
  status: MetricRequestStatus;
}

export interface AcceptedMetric {
  metricId: Metric['id'];
  metricName: Metric['name'];
  metricType: Metric['type'];
  reportingPeriod: MetricSharePeriod;
  question?: Metric['typeConfig']['question'];
}
