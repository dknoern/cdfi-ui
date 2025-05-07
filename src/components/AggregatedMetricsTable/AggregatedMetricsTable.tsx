import React, { FC, useMemo } from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { TableProps } from 'antd/lib/table';
import { WithClass } from 'types';
import { MetricColumnWidth } from 'types/aggregatedMetricTableItem';
import { getPopupContainer } from 'tools/antConfig';
import { columns } from './tools';
import { metricColumns } from './constants';
import { AggregatedMetric } from 'types/aggregatedMetric';

type AggregatedMetricsTableProps = TableProps<AggregatedMetric> &
  WithClass & {
    layout?: 'auto' | 'fixed';
    columnNamesList: string[];
    isLoading?: boolean;
    columnWidth?: MetricColumnWidth;
  };

export const AggregatedMetricsTable: FC<AggregatedMetricsTableProps> = ({
  layout = 'auto',
  dataSource,
  columnNamesList,
  className,
  rowKey = 'id',
  isLoading,
  columnWidth,
  ...props
}) => {
  const metricColumnsFiltered = useMemo<ColumnType<AggregatedMetric>[]>(() => {
    const defaultColumns = metricColumns.filter((column) =>
      columnNamesList.includes(column.dataIndex as string),
    );
    return columns({
      defaultColumns,
      columnWidth,
    });
  }, [columnNamesList, columnWidth]);

  return (
    <Table
      rowKey={rowKey}
      tableLayout={layout}
      pagination={false}
      showSorterTooltip={false}
      className={className}
      dataSource={dataSource}
      loading={isLoading}
      columns={metricColumnsFiltered}
      getPopupContainer={getPopupContainer}
      {...props}
    />
  );
};
