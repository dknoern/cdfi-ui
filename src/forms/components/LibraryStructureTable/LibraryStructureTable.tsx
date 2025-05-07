import React, { FC } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { isFolder, FolderType } from 'types';
import { tableCols } from './constants';

import styles from './LibraryStructureTable.module.scss';

interface LibraryStructureTableProps {
  loading?: boolean;
  dataSource: TableProps<FolderType>['dataSource'];
  onTableChange: TableProps<FolderType>['onChange'];
}
export const LibraryStructureTable: FC<LibraryStructureTableProps> = ({
  loading,
  dataSource,
  onTableChange,
}) => {
  return (
    <Table
      id="documentLibraryTable"
      pagination={false}
      columns={tableCols}
      dataSource={dataSource}
      className={styles.table}
      rowKey={(record): string => {
        return isFolder(record) ? 'id' : 'name';
      }}
      loading={loading}
      onChange={onTableChange}
    />
  );
};
