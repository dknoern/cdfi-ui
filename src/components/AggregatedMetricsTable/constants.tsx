import { ColumnType } from 'antd/lib/table';
import { sortByString } from 'tools';
import { MetricColumns } from 'types/aggregatedMetricTableItem';
import { Metric, AggregatedMetric } from '../../types';
import React, { ReactNode } from 'react';

export const metricColumns: ColumnType<AggregatedMetric>[] = [
  {
    title: 'Name',
    dataIndex: MetricColumns.NAME,
    sorter: (a: AggregatedMetric, b: AggregatedMetric): number =>
      sortByString(a.name ?? '', b.name ?? ''),
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Metrics',
    dataIndex: MetricColumns.METRICS,
    render: (row): ReactNode => (
      <>
        {row.metrics
          ?.sort((a: Metric, b: Metric) =>
            a.accountCode.localeCompare(b.accountCode),
          )
          .map((metric: Metric, index: number) => {
            return <p key={metric.name + index}>{metric.name}</p>;
          })}
      </>
    ),
  },
];
