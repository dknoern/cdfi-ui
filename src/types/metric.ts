import { MetricType } from './metricType';
import { MetricSharePeriod } from './metricSharePeriod';
import { MetricRequestStatus } from './metricRequestStatus';
import { MetricCategory, MetricSubCategory } from './metricCategory';
import { Tag } from './tag';

export enum MetricNumericFormat {
  NUMBER = 'NUMBER',
  DOLLAR = 'DOLLAR',
  PERCENTAGE = 'PERCENTAGE',
}

export type MetricTypeConfig = {
  type: MetricType;
  decimals?: number;
  format?: MetricNumericFormat;
  question?: string;
  dateFormat?: string;
};

// for using in charts
export type MetricTypeConfig4Numeric = NonNullable<
  Pick<MetricTypeConfig, 'format'>
> &
  NonNullable<Pick<MetricTypeConfig, 'decimals'>>;

export interface Metric {
  id: number;
  name: string;
  accountCode: string;
  isPublic?: boolean;
  type: MetricType;
  typeConfig: MetricTypeConfig;
  parentId: MetricSubCategory['id'] | null;
  grandParentId: MetricCategory['id'] | null;
  tags?: Tag['id'][];
  status?: MetricRequestStatus;
  sortAccountCode?: number;
  grandParentCategoryName?: string;
  parentCategoryName?: string;
  rank?: number;
  companyId?: number;
  maximumVariance?: number;
  varianceComparePeriod?: string;
  checkVarianceIncrease?: boolean;
  values?: MetricValue[];
}

export interface MetricValue {
  id: number;
  amount: number | null;
  metricId: number;
  textValue: string | null;
  month: number;
  year: number;
  quarter: number;
  value: string;
  periodEndDate: string;
  periodType: string;
  fiscalYear: number;
  fiscalQuarter: number;
}

// exclude type BC V2 metrics have typeConfig
export type GlobalMetric = Omit<Metric, 'reportPeriod' | 'type' | 'values'>;
// the same model used for Portfolio metrics (group of PCs)

// was requested and accepted
export type CompanyMetric = GlobalMetric & {
  frequency: MetricSharePeriod;
};

// was requested, but may be in pending status
export type AssignedMetric = CompanyMetric & {
  status: MetricRequestStatus;
};
