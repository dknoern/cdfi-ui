import { ColumnType } from 'antd/lib/table';
import { sortByString } from 'tools';
import { Tag } from 'types';
import { MetricRowItem, MetricColumns } from 'types/metricTableItem';
import { MetricRequestStatus } from 'types/metricRequestStatus';
import { renderType, renderFrequency } from './tools';

export const metricColumns: ColumnType<MetricRowItem>[] = [
  {
    title: 'Metric',
    dataIndex: MetricColumns.NAME,
    sorter: (a: MetricRowItem, b: MetricRowItem): number =>
      sortByString(a.name ?? '', b.name ?? ''), // BC sometimes BE returns null
  },
  {
    title: 'Code',
    dataIndex: MetricColumns.ACCOUNT_CODE,
    sorter: (a: MetricRowItem, b: MetricRowItem): number =>
      sortByString(a.accountCode ?? '', b.accountCode ?? ''), // BC sometimes BE returns null
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Type',
    dataIndex: MetricColumns.TYPE,
    onFilter: (
      value: string | number | boolean,
      record: MetricRowItem,
    ): boolean =>
      record.type ? record.type === value : record.typeConfig?.type === value,
    render: renderType,
  },
  {
    title: 'Category',
    dataIndex: MetricColumns.GRANDPARENT_ID,
    onFilter: (
      value: string | number | boolean,
      record: MetricRowItem,
    ): boolean => record.grandParentId === value,
  },
  {
    title: 'Subcategory',
    dataIndex: MetricColumns.PARENT_ID,
    onFilter: (
      value: string | number | boolean,
      record: MetricRowItem,
    ): boolean => record.parentId === value,
  },
  {
    title: 'Tags',
    dataIndex: MetricColumns.TAGS,
    onFilter: (
      value: string | number | boolean,
      record: MetricRowItem,
    ): boolean => (record.tags || []).includes(Number(value) as Tag['id']),
  },
  {
    title: 'Reporting Frequency',
    dataIndex: MetricColumns.FREQUENCY,
    onFilter: (
      value: string | number | boolean,
      record: MetricRowItem,
    ): boolean => record.frequency === value,
    render: renderFrequency,
  },
];

export const metricRequestStatusToText = {
  [MetricRequestStatus.APPROVED]: 'accepted',
  [MetricRequestStatus.PENDING_APPROVAL]: 'waiting for approval',
  [MetricRequestStatus.NOT_REQUIRED]: 'not required',
  [MetricRequestStatus.DECLINED]: 'rejected',
};
