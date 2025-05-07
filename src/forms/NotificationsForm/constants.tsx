import React from 'react';
import { Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { LibraryFolder4Notifications } from 'types';
import { GRID_COL_FULL_ROW_SPAN } from 'constants/ui';

export const TEXT_AREA_ROWS = 5;
export const SWITCH_COL_SPAN = GRID_COL_FULL_ROW_SPAN - 22;
export const SWITCH_INFO_COL_SPAN = GRID_COL_FULL_ROW_SPAN - 2;

export const notificationsCols: ColumnsType<
  LibraryFolder4Notifications & {
    update: (name: string, parentFolderName: string) => void;
    disabled?: boolean;
  }
> = [
  {
    title: '',
    key: 'on',
    dataIndex: 'on',
    render: (value, record): JSX.Element => {
      return (
        <Switch
          size="small"
          checked={value}
          disabled={!!record.disabled}
          onClick={(): void => {
            record.update(record.name, record.parentFolderName);
          }}
        />
      );
    },
  },
  {
    title: 'Item Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Parent Folder',
    dataIndex: 'parentFolderName',
    key: 'parentFolderName',
  },
  {
    title: 'Reporting Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
  },
];
