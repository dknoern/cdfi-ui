import React, { FC, useMemo } from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { GraphMeta, GraphType } from 'types/graphs';
import { useGraphsFor } from 'dataManagement';
import { chartColumns } from './constants';
import { filterSelectedCharts } from './tools';
import styles from './TablesAndCharts.module.scss';

export const TablesReview: FC = () => {
  const { data: charts, isLoading: isChartsLoading } = useGraphsFor({
    portfolioId: 0,
    companyId: 0,
  });

  const columns = useMemo<ColumnType<GraphMeta>[]>(() => {
    if (!charts) return [];
    return chartColumns(
      Object.keys(GraphType).filter((type) =>
        filterSelectedCharts(charts ?? []).find(
          (chart) => chart.graphType === type,
        ),
      ) as GraphType[],
    );
  }, [charts]);

  return (
    <Table
      id="chartsReviewTable"
      rowKey="id"
      pagination={false}
      showSorterTooltip={false}
      className={styles.table}
      loading={isChartsLoading}
      dataSource={filterSelectedCharts(charts ?? []) ?? []}
      columns={columns}
    />
  );
};
