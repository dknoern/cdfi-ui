import React, { FC, useMemo } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { MetricSharePeriod } from 'types';
import { FolderView } from 'types/libraryViews';
import {
  FolderTableItem,
  LibraryTableFilters,
  LibraryTableRowItem,
} from 'types/libraryTableItem';
import { tableRows2FolderIdConfig } from 'tools/library';
import { libraryColumns } from './constants';
import { getExpandableIcon, getRowClassName, rearrangeFolders } from './tools';
import styles from './LibraryTable.module.scss';

type LibraryTableProps = TableProps<LibraryTableRowItem> & {
  isLoading: boolean;
  columnNamesList: string[];
  filters?: LibraryTableFilters;
  getTableItemLink?: (folderId: FolderView['id']) => string;
  onActionClick?: (folderId: FolderView['id']) => void;
};

export const LibraryTable: FC<LibraryTableProps> = ({
  dataSource,
  isLoading,
  columnNamesList,
  className,
  filters,
  getTableItemLink,
  onActionClick,
  ...restProps
}) => {
  const folderIdConfig = useMemo(() => {
    return tableRows2FolderIdConfig(dataSource ?? []);
  }, [dataSource]);

  const columns = useMemo(() => {
    return libraryColumns({
      getTableItemLink,
      onActionClick,
      filters,
      frequencies: Object.keys(MetricSharePeriod).filter((frequency) =>
        dataSource?.find(
          (data) =>
            (data as FolderTableItem).frequency ===
            (frequency as MetricSharePeriod),
        ),
      ) as MetricSharePeriod[],
      folderIdConfig,
    }).filter((column) => columnNamesList.includes(column.dataIndex as string));
  }, [
    columnNamesList,
    getTableItemLink,
    filters,
    onActionClick,
    dataSource,
    folderIdConfig,
  ]);

  // need 2 specific folder first
  const useItems = useMemo<LibraryTableRowItem[]>(
    () => rearrangeFolders(dataSource ?? [], folderIdConfig),
    [dataSource, folderIdConfig],
  );

  return (
    <Table
      {...restProps}
      dataSource={useItems}
      loading={isLoading}
      columns={columns}
      pagination={false}
      showSorterTooltip={false}
      className={`${styles.table} ${className ?? ''}`}
      rowClassName={(record): string => getRowClassName(record, dataSource)}
      expandable={{
        indentSize: 30,
        rowExpandable: (record): boolean =>
          !!record.children && record.children.length > 0,
        expandIcon: getExpandableIcon,
      }}
    />
  );
};
