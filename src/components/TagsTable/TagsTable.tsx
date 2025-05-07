import React, { FC, useMemo } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { WithClass } from 'types';
import { TagTableItem } from 'types/tagTableItem';
import { tagsColumns } from './constants';

type TagsTableProps = TableProps<TagTableItem> &
  WithClass & {
    columnNamesList: string[];
  };

export const TagsTable: FC<TagsTableProps> = ({
  className,
  columnNamesList,
  ...restProps
}) => {
  const columns = useMemo(
    () =>
      tagsColumns.filter((column) =>
        columnNamesList.includes(column.dataIndex as string),
      ),
    [columnNamesList],
  );

  return (
    <Table
      columns={columns}
      pagination={false}
      showSorterTooltip={false}
      className={className}
      {...restProps}
    />
  );
};
