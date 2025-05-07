import { Company, Metric } from 'types';
import { PeriodConfig } from 'forms/ChartCreate/types';

export interface PreviewDataCol {
  period: string;
  value: string;
}

export interface PreviewDataRow {
  metric: string;
  code: string | null;
  data: PreviewDataCol[];
}

export interface PreviewData {
  columns: string[];
  rows: PreviewDataRow[];
}

export type MetricsPreviewConfig = {
  companyIds: Company['id'][];
  metricIds: Metric['id'][];
  period: PeriodConfig;
};
