import { MetricColumns, ColumnWidth } from 'types/metricTableItem';

export const columnList = [
  MetricColumns.NAME,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.TYPE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.TAGS,
];

export const columnWidth: ColumnWidth = {
  name: '50px',
  accountCode: '50px',
  parentId: '50px',
  grandParentId: '50px',
  tags: '200px',
  type: '30px',
};
