import { FiscalQuarter } from 'types/reportedData';
import { Metric } from './metric';

export type NotificationMeta =
  | FileUploadedMeta
  | DataInputMeta
  | MetricValueChangeRequestMeta
  | MetricReportResponseMeta
  | MetricReportRequestMeta
  | AllRequiredDataProvidedMeta;

export interface FileUploadedMeta {
  document: string;
  folder: string;
  quarter: FiscalQuarter;
  year: number;
}

export interface DataInputMeta {
  metrics: Metric['name'][];
  quarter: FiscalQuarter;
  year: number;
}

export interface MetricValueChangeRequestMeta {
  metricId: Metric['id'];
  metricName: Metric['name'];
  quarter: FiscalQuarter;
  year: number;
  status: MetricStatus;
}

export interface MetricReportRequestMeta {
  metrics: Metric['name'][];
}

export interface MetricReportResponseMeta {
  metrics: Metric['name'][];
  status: Exclude<MetricStatus, MetricStatus.REQUESTED>;
}

export interface AllRequiredDataProvidedMeta {
  quarter: FiscalQuarter;
  year: number;
}

export enum MetricStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}
