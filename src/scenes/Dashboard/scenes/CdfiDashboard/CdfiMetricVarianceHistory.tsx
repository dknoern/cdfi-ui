import { Table } from 'antd';
import { PageableTable } from '../../../../types/pageableTable';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { getVarianceActivities } from '../../../../dataManagement/operations/cdfiOperations';
import { ActivityModel } from '../../../../types';

const activityTypes = [
  'VARIANCE_DETECTED',
  'REQUIRED_METRIC_DETECTED',
  'TASK_ASSIGNED_CHANGE',
  'TASK_STATUS_CHANGE',
];
const paginationDefaults = {
  pageSize: 10,
  current: 1,
};

export type MetricVarianceProps = {
  companyId: number;
};

export const CdfiMetricVarianceTable: FC<MetricVarianceProps> = (
  props: MetricVarianceProps,
) => {
  const { companyId } = props;
  const [data, setData] = useState<PageableTable<ActivityModel> | undefined>();

  useEffect(() => {
    getVarianceActivities(
      props.companyId,
      activityTypes,
      paginationDefaults.current - 1,
      paginationDefaults.pageSize,
    ).then((response) => setData(response));
  }, [companyId]);

  function renderDate(_: string, record: ActivityModel): ReactNode {
    if (record?.date !== undefined) {
      const date = new Date(record.date);
      return date.toLocaleString();
    }
    return '';
  }

  function renderName(_: string, record: ActivityModel): string {
    return `${record?.person?.firstName} ${record?.person?.lastName}`;
  }

  const columns = [
    { title: 'Activity', dataIndex: 'description' },
    { title: 'Person', render: renderName },
    { title: 'Year', dataIndex: 'year' },
    { title: 'Quarter', dataIndex: 'quarter' },
    { title: 'Date', render: renderDate },
  ];

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<ActivityModel> | SorterResult<ActivityModel>[],
    extra: TableCurrentDataSource<ActivityModel>,
  ): void => {
    getVarianceActivities(
      props.companyId,
      activityTypes,
      (pagination?.current || paginationDefaults.current) - 1,
      pagination.pageSize || paginationDefaults.pageSize,
    ).then((response) => setData(response));
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.content}
        onChange={handleChange}
        pagination={{
          current: (data?.number || 0) + 1,
          defaultPageSize: paginationDefaults.pageSize,
          total: data?.totalElements,
        }}
      />
    </div>
  );
};
