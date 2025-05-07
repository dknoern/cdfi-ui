import { ColumnWidth, MetricColumns } from 'types/metricTableItem';

export const columnWidth: ColumnWidth = {
  [MetricColumns.NAME]: '200px',
  [MetricColumns.ACCOUNT_CODE]: '80px',
  [MetricColumns.GRANDPARENT_ID]: '130px',
  [MetricColumns.PARENT_ID]: '130px',
  [MetricColumns.TAGS]: '220px',
};

export const columnsList = [
  MetricColumns.NAME,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.TAGS,
];
