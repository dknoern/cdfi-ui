import React, { FC, useMemo } from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { TableProps as AntTableProps } from 'antd/es/table';
import { GraphPreviewViewMetricEquationItem } from 'types/graphs';
import { renderExpandIcon } from './tools';
import styles from './EquationsTable.module.scss';

type EquationsTableProps = {
  data?: GraphPreviewViewMetricEquationItem[];
  columns?: ColumnProps<GraphPreviewViewMetricEquationItem>[];
  forPortfolio?: boolean;
  isLoading: boolean;
};

type TableProps = AntTableProps<GraphPreviewViewMetricEquationItem>;

export const EquationsTable: FC<EquationsTableProps> = ({
  data,
  columns,
  isLoading,
  forPortfolio = false,
}) => {
  const tableProps = useMemo<TableProps>(() => {
    const defaultProps: TableProps = {
      id: 'equationsTable',
      pagination: false,
      columns,
      dataSource: data,
      loading: isLoading,
      scroll: {
        x: 'max-content',
        y: 600,
      },
      rowKey: 'id',
    };

    return {
      ...defaultProps,
      className: forPortfolio ? styles.table : '',
      expandable: forPortfolio
        ? {
            defaultExpandAllRows: true,
            rowExpandable: (record): boolean => !!record.children,
            expandIcon: renderExpandIcon,
          }
        : undefined,
    };
  }, [columns, data, forPortfolio, isLoading]);

  return <Table {...tableProps} />;
};
