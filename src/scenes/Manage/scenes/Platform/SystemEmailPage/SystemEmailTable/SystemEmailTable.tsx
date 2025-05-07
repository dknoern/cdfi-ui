import React, { FC, useEffect } from 'react';
import { Table } from 'antd';
import {TablePaginationConfig,} from 'antd/lib/table/interface';
import { TableProps } from 'antd/lib/table';
import type { SorterResult } from 'antd/es/table/interface';
import { SystemEmailRowItem, WithClass} from 'types';
import {ColumnWidth } from 'types/metricTableItem';
import { getPopupContainer } from 'tools/antConfig';
import { systemEmailColumns } from './constants';
import {systemEmailStore} from "../../../../../../store";
import {toJS} from "mobx";

type SystemEmailTableProps = TableProps<SystemEmailRowItem> &
  WithClass & {
  layout?: 'auto' | 'fixed';
  columnNamesList: string[];
  isLoading?: boolean;
  columnWidth?: ColumnWidth;
  showStatusIcon?: boolean;
};

const pageSizeOptions = ['5', '10', '20'];

export const SystemEmailTable: FC<SystemEmailTableProps> = ({layout = 'auto', dataSource, columnNamesList, className, rowKey = 'id', isLoading, columnWidth, showStatusIcon = false, ...props
}) => {
  const {systemEmails, getSystemEmails, setPagination, pagination} = systemEmailStore;

  const onTableChange = (pagination: TablePaginationConfig,
                         filters: Record<string, (string | number | boolean)[] | null>,
                         sorter: SorterResult<any>[]) => {
    const pageNumber = pagination.current !== undefined ? pagination.current - 1 : pagination.current;
    setPagination({current: pageNumber, pageSize: pagination.pageSize})
    getSystemEmails(pageNumber, pagination.pageSize, sorter)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <Table
      rowKey={rowKey}
      tableLayout={layout}
      // @ts-ignore
      onChange={onTableChange}
      pagination={{
        ...toJS(pagination),
        showSizeChanger: true,
        pageSizeOptions,
        total: systemEmails.totalElements,
      }}
      showSorterTooltip={false}
      className={className}
      dataSource={dataSource}
      columns={systemEmailColumns}
      getPopupContainer={getPopupContainer}
      {...props}
    />
  );
};
