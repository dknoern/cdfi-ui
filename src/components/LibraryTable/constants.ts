import { ReactNode } from 'react';
import { ColumnType } from 'antd/lib/table';
import { MetricSharePeriod } from 'types';
import { FolderIdConfig, FolderView } from 'types/libraryViews';
import {
  LibraryTableColumns,
  LibraryTableFilters,
  LibraryTableRowFileItem,
  LibraryTableRowItem,
  LibraryTableRowLibItem,
} from 'types/libraryTableItem';
import { metricSharePeriodNames } from 'constants/metricSharePeriod';
import { formatDateTime, sortByLastModified } from 'tools';
import {
  renderAction,
  renderCompanies,
  renderItemName,
  makeNameSorter,
} from './tools';

type LibraryColumns = {
  getTableItemLink?: (folderId: FolderView['id']) => string;
  onActionClick?: (folderId: FolderView['id']) => void;
  filters?: LibraryTableFilters;
  frequencies: MetricSharePeriod[];
  folderIdConfig: FolderIdConfig;
};

export const libraryColumns = ({
  getTableItemLink,
  onActionClick,
  filters,
  frequencies,
  folderIdConfig,
}: LibraryColumns): ColumnType<LibraryTableRowItem>[] => [
  {
    title: 'Item Name',
    dataIndex: LibraryTableColumns.NAME,
    sorter: makeNameSorter(folderIdConfig),
    defaultSortOrder: 'ascend',
    render: (value: string, record: LibraryTableRowItem): ReactNode =>
      renderItemName(value, record, getTableItemLink),
    ellipsis: true,
  },
  {
    title: 'Date Modified',
    dataIndex: LibraryTableColumns.LAST_MODIFIED,
    width: 180,
    render: (value): ReactNode => formatDateTime(value),
    sorter: (a, b): number =>
      sortByLastModified(
        a as LibraryTableRowFileItem,
        b as LibraryTableRowFileItem,
      ),
  },
  {
    title: 'Reporting Frequency',
    dataIndex: LibraryTableColumns.FREQUENCY,
    width: 180,
    filters: frequencies.map((period) => ({
      text: metricSharePeriodNames[period as MetricSharePeriod],
      value: period,
    })),
    onFilter: (
      value: string | number | boolean,
      record: LibraryTableRowItem,
    ): boolean => (record as LibraryTableRowFileItem).frequency === value,
    render: (value: string, record: LibraryTableRowItem): ReactNode =>
      metricSharePeriodNames[
        (record as LibraryTableRowFileItem).frequency as MetricSharePeriod
      ] ?? '',
  },
  {
    title: 'Description',
    dataIndex: LibraryTableColumns.DESCRIPTION,
  },
  {
    title: 'Attached Reporting Entities',
    dataIndex: LibraryTableColumns.COMPANIES,
    onFilter: (value, record): boolean =>
      !!(record as LibraryTableRowLibItem).pcCompanies.find(
        (company) => company.id === value,
      ),
    filterMultiple: true,
    render: (value, record): ReactNode =>
      renderCompanies(value, record as LibraryTableRowLibItem),
    filters: filters?.companies ?? [],
  },
  {
    dataIndex: LibraryTableColumns.REPORTING_PERIOD,
    title: 'Reporting Period',
    width: 180,
  },
  {
    dataIndex: LibraryTableColumns.ACTION,
    render: (value, record): ReactNode =>
      renderAction(value, record as LibraryTableRowFileItem, onActionClick),
    width: 150,
  },
];
