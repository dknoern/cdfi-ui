import { Metric } from 'types';
import { MetricValue, FormData4MVCR } from 'types/metricValue';
import { ReportingPeriod } from 'types/reportedData';

export type FilterState = {
  subcategory: React.Key[];
  category: React.Key[];
};

export type FilterReducerAction = FilterState;

// used for New Period Data
export type PeriodData = Map<Metric['id'], MetricValue>;
export interface PeriodDataAction {
  metricId: Metric['id'];
  value: MetricValue;
}

export type OccupiedPeriods = Map<
  ReportingPeriod['year'],
  ReportingPeriod['quarter'][]
>;
export type RequestConfig = {
  metricId: FormData4MVCR['metricId'];
  period: FormData4MVCR['period'];
};

export interface PeriodDeleteHandler {
  (period: ReportingPeriod): void;
}
