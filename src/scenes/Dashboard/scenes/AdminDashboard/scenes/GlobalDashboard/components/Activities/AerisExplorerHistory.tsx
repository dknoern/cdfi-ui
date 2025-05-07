import { Checkbox, Input, Space, Table } from 'antd';
import { PageableTable } from '../../../../../../../../types/pageableTable';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { getActivitiesByType } from '../../../../../../../../dataManagement/operations/cdfiOperations';
import { ActivityModel } from '../../../../../../../../types';
import styles from './RecentActivities.module.scss';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const viewedActivityTypes = [
  'PEER_GROUP_REPORT_VIEWED',
  'PORTFOLIO_SEGMENT_REPORT_VIEWED',
  'COMPARISON_REPORT_VIEWED',
];

const crudActivityTypes = [
  'PEER_GROUP_CREATED',
  'PEER_GROUP_MODIFIED',
  'PEER_GROUP_ARCHIVED',
  'PEER_GROUP_DELETED',
  'PORTFOLIO_SEGMENT_CREATED',
  'PORTFOLIO_SEGMENT_MODIFIED',
  'PORTFOLIO_SEGMENT_ARCHIVED',
  'PORTFOLIO_SEGMENT_DELETED',
  'COMPARISON_CREATED',
  'COMPARISON_MODIFIED',
  'COMPARISON_ARCHIVED',
  'COMPARISON_DELETED',
];

const allActivityTypes = [...viewedActivityTypes, ...crudActivityTypes];

const paginationDefaults = {
  pageSize: 10,
  current: 1,
};

export type MetricVarianceProps = {
  companyId?: number;
};

const getActivityTypeFilter = (filterViewEvents: boolean): string[] => {
  if (filterViewEvents) {
    return allActivityTypes;
  }
  return crudActivityTypes;
};

export const AerisExplorerHistoryTable: FC<MetricVarianceProps> = (
  props: MetricVarianceProps,
) => {
  const { companyId } = props;
  const [data, setData] = useState<PageableTable<ActivityModel> | undefined>();
  const [filterViewEvents, setFilterViewEvents] = useState<boolean>(false);

  useEffect(() => {
    getActivitiesByType(
      props.companyId,
      getActivityTypeFilter(filterViewEvents),
      paginationDefaults.current - 1,
      paginationDefaults.pageSize,
    ).then((response) => setData(response));
  }, [companyId, filterViewEvents]);

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
    { title: 'Person', render: renderName },
    { title: 'Date', render: renderDate },
    { title: 'Company', dataIndex: 'companyName' },
    { title: 'Activity', dataIndex: 'description' },
  ];

  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<ActivityModel> | SorterResult<ActivityModel>[],
    extra: TableCurrentDataSource<ActivityModel>,
  ): void => {
    getActivitiesByType(
      props.companyId,
      getActivityTypeFilter(filterViewEvents),
      (pagination?.current || paginationDefaults.current) - 1,
      pagination.pageSize || paginationDefaults.pageSize,
    ).then((response) => setData(response));
  };

  const onFilterViewEventsChange = (e: CheckboxChangeEvent) =>
    setFilterViewEvents(e.target.checked);

  return (
    <div>
      <Space className={styles.tableSearchBar}>
        <Checkbox onChange={onFilterViewEventsChange}>
          Show view activities
        </Checkbox>
      </Space>
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
