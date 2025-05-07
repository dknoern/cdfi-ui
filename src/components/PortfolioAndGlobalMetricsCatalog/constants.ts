import { ColumnWidth, MetricColumns } from 'types/metricTableItem';

export const tableTabs: Record<string, string> = {
  global: 'Global Metrics List',
  portfolio: 'Portfolio Metrics List',
};

export const globalMetricColumnsList = [
  MetricColumns.NAME,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.TYPE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.TAGS,
];

export const portfolioMetricColumnsList = [
  ...globalMetricColumnsList,
  MetricColumns.FREQUENCY,
];

export const globalMetricColumnsWidth: ColumnWidth = {
  [MetricColumns.NAME]: '200px',
  [MetricColumns.ACCOUNT_CODE]: '200px',
  [MetricColumns.TYPE]: '100px',
  [MetricColumns.GRANDPARENT_ID]: '150px',
  [MetricColumns.PARENT_ID]: '100px',
  [MetricColumns.TAGS]: '250px',
};

export const portfolioMetricColumnsWidth: ColumnWidth = {
  ...globalMetricColumnsWidth,
  [MetricColumns.FREQUENCY]: '200px',
};

export enum MetricsCatalogTab {
  Portfolio = 'portfolio',
  Global = 'global',
}
