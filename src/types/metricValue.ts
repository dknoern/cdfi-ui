import { Company } from './company';
import { Metric } from './metric';
import { ReportingPeriod } from './reportedData';

export type MetricMultipleOptionValues = {
  name: string;
  value: string;
};

export type MetricValue = string | number;

export interface UpdateValueFormData {
  metric: Metric;
  period: ReportingPeriod;
  oldValue: MetricValue;
}
export interface MetricValueChangeRequest {
  requestId: number;
  requestDate: number;
  requestReason: string | null;
  companyId: Company['id'];
  companyName: Company['name'];
  currentValue: MetricValue;
  newValue: MetricValue;
  metricName: Metric['name'];
  metricId: Metric['id'];
  metricValueId: number;
  period: ReportingPeriod;
}

// TODO should be fixed on Back-end side
export type MetricValueChangeRequestView = Omit<
  MetricValueChangeRequest,
  'period'
> & { period: string }; // Q4-2017

// MVCR = Metric Value Change Request
export interface FormData4MVCR {
  metricId: MetricValueChangeRequest['metricId'];
  name: MetricValueChangeRequest['metricName'];
  value: MetricValueChangeRequest['newValue'];
  reason: MetricValueChangeRequest['requestReason'];
  requestId: MetricValueChangeRequest['requestId'];
  period: ReportingPeriod;
  companyId: MetricValueChangeRequest['companyId'];
}
