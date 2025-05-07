import { MetricType } from './metricType';
import { Metric } from './metric';
import { MetricSharePeriod } from './metricSharePeriod';
import { Company } from './company';
import { MetricCategory, MetricSubCategory } from './metricCategory';
import { MetricValue } from './metricValue';
import { MetricRequestStatus } from './metricRequestStatus';

type Value = string;

type Column = string;

export type FiscalQuarter = 1 | 2 | 3 | 4;

export type ReportingPeriod = {
  year: number;
  quarter: FiscalQuarter;
};

export interface DataItem {
  metricId: Metric['id'];
  requestStatus: MetricRequestStatus;
  code: Metric['accountCode'];
  name: Metric['name'];
  type: MetricType;
  categoryId: MetricSubCategory['id'];
  categoryName: MetricSubCategory['name'];
  subcategoryId: MetricCategory['id'];
  subcategoryName: MetricCategory['name'];
  frequency: MetricSharePeriod;
  values: Value[];
  isCatLine?: boolean;
  question?: Metric['typeConfig']['question'];
  [key: string]: string | number | string[] | any;
}

export interface DataCategory {
  datas: DataItem[];
  subCategories: DataCategory[] | null;
}

export interface ReportedData {
  categories: DataCategory[];
  columns: Column[];
}

export interface ReportedData4Period {
  year: ReportingPeriod['year'];
  quarter: ReportingPeriod['quarter'];
  values: {
    metricId: Metric['id'];
    value: MetricValue;
  }[];
  pcId?: Company['id'];
}

// prefix for data from BE
// used for sign the metric value change requests
export enum DATA_CHANGE_SIGN {
  APPROVED = '[',
  PENDING_INCOMING = '~',
  PENDING_OUTGOING = '^',
}

export interface DataHookConfig {
  convertEmpty?: boolean;
  loadEmpty?: boolean;
}

export interface DataCellProps {
  record: DataItem;
  title: string;
  period: ReportingPeriod;
  dataIndex: string;
  plainValue: string;
}
