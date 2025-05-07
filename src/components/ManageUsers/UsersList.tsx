import React, { FC, useState, useEffect, SyntheticEvent } from 'react';
import { Table as AntTable, Space, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/lib/table/interface';
import { ColumnProps, ColumnType } from 'antd/lib/table';
import { User, VoidFn } from 'types';
import { MetricRowItem } from 'types/metricTableItem';
import { PageSectionWrapper, TablePlace } from 'components';
import { columns } from './constants';
import { actionButtons } from './actionButtons';
import { EditUsersBatch } from './components/EditUsersBatch';
import { handleFilter } from '../../tools/searchBarTools/handleFilter';
import ResizableHeader from '../../components/ResizableHeader/ResizableHeader';
import styles from 'components/ManageTableStyles.module.scss';

type UsersListProps = {
  isLoading?: boolean;
  users: User[];
  onStartAdd: VoidFn;
  onStartEdit: (userId: User['id']) => void;
  onStartDelete: (userId: User['id'][]) => void;
  selected: React.Key[];
  setSelected: (selected: React.Key[]) => void;
};

type ResizeCallbackData = {
  node: HTMLElement;
  size: { width: number; height: number };
  handle: ResizeHandleAxis;
};

type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

function addIdAsKey(data: User[]) {
  return data.map((user) => ({ key: user.id, ...user }));
}

const title = 'Users';

export const UsersList: FC<UsersListProps> = React.memo(
  ({
    isLoading,
    users,
    onStartAdd,
    onStartEdit,
    onStartDelete,
    selected,
    setSelected,
  }) => {
    const data = addIdAsKey(users);
    const [filterValue, setFilterValue] = useState('');
    const [filtered, setFiltered] = useState<User[]>(data);
    const [newColumns, setNewColumns] = useState<ColumnProps<User>[]>(columns);

    useEffect(() => {
      setFiltered(handleFilter(filterValue, data));
    }, [filterValue, users]);

    const rowSelection: TableRowSelection<MetricRowItem> = {
      onChange: setSelected,
      selectedRowKeys: selected,
    };

    const components = {
      header: {
        cell: ResizableHeader,
      },
    };

    const handleResize =
      (index: number) =>
      (e: SyntheticEvent, { size }: ResizeCallbackData) => {
        const nextColumns = [...newColumns];

        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };

        setNewColumns(nextColumns);
      };

    const resizableColumns = newColumns.map((col, index) => ({
      ...col,

      onHeaderCell: (column: ColumnType<User>): any => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }));

    return (
      <PageSectionWrapper
        title={title}
        actionButtons={actionButtons(onStartAdd)}
      >
        <Space className={styles.tableSearchBar}>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.persist();
              setFilterValue(e.target.value.toLowerCase());
            }}
            placeholder={`Search ${title.toLowerCase()}...`}
            allowClear
            suffix={<SearchOutlined />}
          />
        </Space>
        <EditUsersBatch
          selectedUserIds={selected as User['id'][]}
          users={users}
          onStartEdit={onStartEdit}
          onStartDelete={onStartDelete}
          onFinish={(): void => {
            setSelected([]);
          }}
        />
        <TablePlace hasActionLine>
          {(tableHeight): JSX.Element => (
            <AntTable
              components={components}
              columns={resizableColumns}
              dataSource={filtered}
              rowSelection={rowSelection}
              className={styles.table}
              loading={isLoading}
            />
          )}
        </TablePlace>
      </PageSectionWrapper>
    );
  },
);
