import React, { ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import {
  SharingPeriod,
  FolderType,
  isFolder,
  isCreatedFolder,
  TableIconType,
  isCreatedSubFolder,
} from 'types';
import { capitalizeFirstLetter } from 'tools';
import { TableIcon } from 'components';

export const tableCols: ColumnProps<FolderType>[] = [
  {
    key: 'icon',
    align: 'center',
    width: '20px',
    render: (text, record): React.ReactNode => {
      let iconType: TableIconType = 'folder';

      if (
        (isFolder(record) && record.parentFolder) ||
        (isCreatedFolder(record) && !record.subFolders) ||
        isCreatedSubFolder(record)
      ) {
        iconType = 'branch';
      }

      return <TableIcon type={iconType} />;
    },
  },
  {
    key: 'name',
    title: 'Item name',
    dataIndex: 'name',
    sorter: true,
    render: (text, record): ReactNode => {
      if (
        (isFolder(record) && record.parentFolder) ||
        (isCreatedFolder(record) && !record.subFolders) ||
        isCreatedSubFolder(record)
      ) {
        return (
          <>
            <TableIcon type="sub-folder" />
            {record.name}
          </>
        );
      }

      return record.name;
    },
  },
  {
    key: 'reportingFrequency',
    title: 'Reporting Frequency',
    dataIndex: 'reportingFrequency',
    filters: Object.values(SharingPeriod).map((val) => ({
      text: capitalizeFirstLetter(val),
      value: val,
    })),
    render: (text, record): string => {
      const { frequency } = record;

      if (frequency) return capitalizeFirstLetter(frequency);

      return '';
    },
  },
  {
    key: 'description',
    title: 'Description',
    dataIndex: 'description',
    render: (text, record): string => record.description || '',
  },
];
