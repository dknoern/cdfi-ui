import React, { ReactNode } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import { AllOrganizations, companyTypeNames } from 'types/allOrganizations';
import { ColumnType } from 'antd/lib/table';
import { CompanyType } from 'types';
import { format, formatInTimeZone } from 'date-fns-tz';
import styles from './AllOrganizationsManage.module.scss';

export const allOrganizationsManageColumns: ColumnType<AllOrganizations>[] = [
  {
    width: 280,
    key: 'name',
    title: 'Organization Name',
    dataIndex: 'name',
    sorter: true,
  },
  {
    width: 150,
    key: 'companyType',
    title: 'Type',
    dataIndex: 'companyType',
    render: (value: CompanyType): ReactNode => companyTypeNames[value],
    sorter: true,
  },
  {
    width: 230,
    key: 'address',
    title: 'Address',
    dataIndex: 'address',
    sorter: false,
  },
  {
    width: 130,
    key: 'city',
    title: 'City',
    dataIndex: 'city',
    sorter: true,
  },
  {
    width: 80,
    key: 'state',
    title: 'State',
    dataIndex: 'state',
    sorter: true,
  },
  {
    width: 130,
    key: 'active',
    title: 'Active Status',
    dataIndex: 'active',
    sorter: true,
    render: (text: string, record: any) => (
      <Paragraph
        className={`${styles.accountStatus} ${styles.accountStatusContacts}`}
      >
        <span className={record?.active ? styles.on : '$'} />
        {record?.active ? 'Active' : 'Inactive'}
      </Paragraph>
    ),
  },
  {
    width: 80,
    key: 'rated',
    title: 'Rated?',
    dataIndex: 'rated',
    sorter: true,
    render: (record: AllOrganizations) => (
      <Paragraph>{record?.rated ? 'Yes' : 'No'}</Paragraph>
    ),
  },
  {
    width: 80,
    key: 'reporting',
    title: 'Reporting?',
    dataIndex: 'reporting',
    sorter: true,
    render: (text: string, record: any) => (
      <Paragraph>{record?.reporting ? 'Yes' : 'No'}</Paragraph>
    ),
  },
  {
    width: 150,
    key: 'fiscalYearEnd',
    title: 'FYE',
    dataIndex: 'fiscalYearEnd',
    sorter: true,
  },
  {
    width: 180,
    key: 'shareFinancials',
    title: 'Share Financials?',
    dataIndex: 'shareFinancials',
    sorter: true,
  },
  {
    width: 230,
    key: 'createdBy',
    title: 'Created By',
    dataIndex: 'createdBy',
    render: (record: { firstName: string; lastName: string }): ReactNode => {
      return (
        <span>
          {record?.firstName} {record?.lastName}
        </span>
      );
    },
    sorter: true,
  },
  {
    width: 200,
    key: 'dateCreated',
    title: 'Date Created',
    dataIndex: 'dateCreated',
    render: (dateCreated: Date): ReactNode =>
      dateCreated ? format(new Date(dateCreated), 'MM/dd/yyyy') : '',
    sorter: true,
  },
  {
    width: 230,
    key: 'updatedBy',
    title: 'Updated By',
    dataIndex: 'updatedBy',
    render: (record: { firstName: string; lastName: string }): ReactNode => (
      <span>
        {record?.firstName} {record?.lastName}
      </span>
    ),
    sorter: true,
  },
  {
    width: 200,
    key: 'dateUpdated',
    title: 'Date Updated',
    dataIndex: 'dateUpdated',
    render: (dateUpdated: Date): ReactNode =>
      dateUpdated
        ? formatInTimeZone(`${dateUpdated}Z`, 'America/New_York', 'Pp z')
        : '',
    sorter: true,
  },
];
