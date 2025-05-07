import { ColumnType } from 'antd/lib/table';
import { format } from 'date-fns-tz';
import React from 'react';
import { ReactNode } from 'react';

export const peerGroupsManageColumns: ColumnType<any>[] = [
  {
    key: 'cdfiName',
    title: 'Name of CDFI',
    dataIndex: 'name',
    width: 400,
    sorter: true,
    defaultSortOrder: 'ascend',
  },
  {
    key: 'totalAssets',
    title: 'Total Assets',
    dataIndex: 'totalAssets',
    width: 200,
    render: (totalAssets: string): ReactNode => <p> ${totalAssets}</p>,
  },
  {
    key: 'primaryLendingTypes',
    title: 'Primary Lending Type',
    dataIndex: 'primaryLendingTypes',
    width: 200,
    render: (primaryLendingTypes: string[]): ReactNode => (
      <div>
        {primaryLendingTypes.map((type) => (
          <p key={type}>{type}</p>
        ))}
      </div>
    ),
  },
  {
    key: 'peerGroups',
    title: 'Peer Groups',
    dataIndex: 'peerGroups',
    width: 400,
    render: (peerGroups: string[]): ReactNode => (
      <div>
        {peerGroups.map((group, index) => (
          <p key={`${group}-${index}`}>{group}</p>
        ))}
      </div>
    ),
  },
  {
    key: 'dateUpdated',
    title: 'Date Last Updated',
    dataIndex: 'dateUpdated',
    width: 200,
    sorter: true,
    render: (dateCreated: Date): ReactNode =>
      dateCreated ? format(new Date(dateCreated), 'MM/dd/yyyy') : '',
  },
];
