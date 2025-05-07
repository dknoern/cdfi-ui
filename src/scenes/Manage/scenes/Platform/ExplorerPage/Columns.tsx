import React, { ReactNode } from 'react';
import { ExplorerFilter, manageExplorerStore } from 'store/manageExplorerStore';
import { ColumnType } from 'antd/lib/table';
import { Button, Popconfirm, Tooltip } from 'antd';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { notifyUser } from 'tools';

export const manageFilterColumns = (): ColumnType<any>[] => {
  function renderDeleteAction(_: string, result: ExplorerFilter): ReactNode {
    const deleteConfirmMessage = `Permanently Remove "${result.equationName}"?`;
    return (
      <Popconfirm
        title={deleteConfirmMessage}
        icon={
          <QuestionCircleOutlined
            style={{
              color: 'red',
            }}
          />
        }
        onConfirm={(): void => {
          manageExplorerStore
            .deleteExplorerFilter(result.equationId)
            .then(() => {
              manageExplorerStore.getExplorerFilters();
              notifyUser.ok('manageExplorerFilters', 'deleteOk');
            });
        }}
      >
        <Tooltip title="Delete">
          <Button type="link" danger icon={<DeleteFilled />} />
        </Tooltip>
      </Popconfirm>
    );
  }

  function renderDate(_: string, result: ExplorerFilter) {
    return result.updatedAt ? new Date(result.updatedAt).toLocaleString() : '';
  }

  return [
    {
      key: 'equationName',
      title: 'Equation Name',
      dataIndex: 'equationName',
    },
    {
      key: 'updatedByName',
      title: 'Added by',
      dataIndex: 'updatedByName',
    },
    {
      key: 'updatedAt',
      title: 'Date Last Added',
      dataIndex: 'updatedAt',
      render: renderDate,
    },
    {
      key: 'actions',
      title: '',
      render: renderDeleteAction,
    },
  ];
};
