import { FormStep } from 'forms/PCCreate/types';
import { MetricColumns } from 'types/metricTableItem';

export const tableTabs: Record<'global' | 'portfolio', string> = {
  global: 'Global Metrics List',
  portfolio: 'Portfolio Metrics List',
};

export const CURRENT_STEP = FormStep.assignMetrics;

export const globalMetricsColumns = [
  MetricColumns.NAME,
  MetricColumns.TYPE,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.TAGS,
];

export const portfolioMetricsColumns = [
  MetricColumns.NAME,
  MetricColumns.TYPE,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.TAGS,
  MetricColumns.FREQUENCY,
];

export const reviewColumnList = [
  MetricColumns.NAME,
  MetricColumns.TYPE,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.TAGS,
  MetricColumns.FREQUENCY,
];
