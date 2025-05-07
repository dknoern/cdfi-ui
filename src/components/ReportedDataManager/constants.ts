import { ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { PersonRole } from 'types/auth';
import { DataItem } from 'types/reportedData';
import { sortByName, sortByString } from 'tools';
import { renderWithTooltip } from 'tools/renderHelpers';

export enum MetricColumnCode {
  NAME = 'name',
  CODE = 'code',
  CATEGORY = 'category',
  SUBCATEGORY = 'subcategory',
}

export const defaultColumnKeys = new Map([
  [
    PersonRole.FUND_MANAGER_ADMIN,
    [
      MetricColumnCode.NAME,
      MetricColumnCode.CATEGORY,
      MetricColumnCode.SUBCATEGORY,
    ],
  ],
  [
    PersonRole.FUND_MANAGER_USER,
    [
      MetricColumnCode.NAME,
      MetricColumnCode.CATEGORY,
      MetricColumnCode.SUBCATEGORY,
    ],
  ],
  [PersonRole.PORTFOLIO_USER, [MetricColumnCode.NAME]],
]);

export const DATA_COLUMN_WIDTH_DEFAULT = 140;

export const defaultColumns: ColumnProps<DataItem>[] = [
  {
    title: 'Metric',
    key: MetricColumnCode.NAME,
    dataIndex: MetricColumnCode.NAME,
    fixed: 'left',
    sorter: (a, b): number => sortByName(a, b),
    width: 300,
    render: (value: string, record): ReactNode =>
      renderWithTooltip(value, record.question),
  },
  {
    title: 'Code',
    key: MetricColumnCode.CODE,
    dataIndex: MetricColumnCode.CODE,
    sorter: (a, b): number => sortByString(a.code, b.code),
    defaultSortOrder: 'ascend',
    fixed: 'left',
  },
  // {
  //   title: 'Category',
  //   key: 'category',
  //   dataIndex: 'categoryId',
  //   render: (_, record): string => record.categoryName,
  //   onFilter: (value, record): boolean => record.categoryId === value,
  //   fixed: 'left',
  //   width: 110,
  // },
  // {
  //   title: 'Subcategory',
  //   key: 'subcategory',
  //   dataIndex: 'subcategoryId',
  //   render: (_, record): string => record.subcategoryName,
  //   onFilter: (value, record): boolean => record.subcategoryId === value,
  //   fixed: 'left',
  //   width: 130,
  // },
];

export const filtersInitialState = {
  subcategory: [],
  category: [],
};
