import { VoidFn, Metric } from 'types';
import { MetricValue } from 'types/metricValue';
import { DataItem, ReportingPeriod } from 'types/reportedData';

export interface DataEditor {
  ({
    metricId,
    period,
    value,
  }: {
    metricId: Metric['id'];
    value: MetricValue;
    period: ReportingPeriod;
  }): void;
}

// used for New Period Data
export type PeriodData = Map<Metric['id'], number>;
export interface PeriodDataAction {
  metricId: Metric['id'];
  value: MetricValue;
  commitImmediately?: true;
}

export interface TableCellButton {
  onClick: VoidFn;
  value: MetricValue;
}

export interface NewPeriodDataChanger {
  (action: PeriodDataAction): void;
}

export type WithRecord<T = {}> = T & { record: DataItem };
