import React from 'react';
import { ColumnType } from 'antd/lib/table';
import { Company, SortResult, Tag } from 'types';
import { DashboardCardType } from 'scenes/Dashboard/types';
import { sortByName, sortByNumber } from 'tools';
import { formatNumberWithCommas } from 'tools/reportedData';
import { cardUrlParts } from 'scenes/Dashboard/constants/cardUrlParts';
import { LinkMaker } from './types';
import { renderTagValue, renderNameValue } from './renderHelpers';

export const getColumns = (
  getLink: LinkMaker,
  cardType: DashboardCardType,
): ColumnType<Company>[] => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: renderNameValue(getLink),
      width: '20%',
      sorter: cardType === DashboardCardType.PORTFOLIO && {
        compare: sortByName,
        multiple: 1,
      },
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Investment type',
      dataIndex: 'investmentType',
      key: 'investmentType',
      width: '15%',
      sorter: sortByName,
    },
    {
      title: 'Total commitment',
      dataIndex: 'totalCommitment',
      key: 'totalCommitment',
      width: '15%',
      render: (value: number): string =>
        value ? formatNumberWithCommas(value) : '',
      sorter: (a, b): SortResult =>
        sortByNumber(Number(a.totalCommitment), Number(b.totalCommitment)),
    },
    {
      title: 'Start date',
      dataIndex: 'investmentStartDate',
      key: 'investmentStartDate',
      width: '10%',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: (values: Tag[]): React.ReactNode => {
        return renderTagValue(values);
      },
      width: '40%',
    },
  ];
};

// TODO: check and change this
export const companyLinkMaker = (
  matchUrl: string,
  portfolioLink: string,
  type: DashboardCardType,
) => (record: Company): string => {
  const companyLink = `${cardUrlParts[DashboardCardType.REPORTING_ENTITY]}/${
    record.id
  }`;

  if (type === DashboardCardType.INVESTMENT) {
    return `${matchUrl}/${companyLink}`;
  }
  return `${portfolioLink}/${companyLink}`;
};
