import React, { ReactNode } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import { AllUsers, companyTypeNames } from 'types/allUsers';
import { ColumnType } from 'antd/lib/table';
import { CompanyType } from 'types';
import { format, formatInTimeZone } from 'date-fns-tz';
import { Button } from 'antd';
import { initiatePasswordResetAdmin } from 'scenes/NotLogged/tools';
import styles from './AllUsersManage.module.scss';

export const allUsersManageColumns: ColumnType<AllUsers>[] = [
  {
    width: 230,
    key: 'username',
    title: 'Username',
    dataIndex: 'username',
    sorter: true,
  },
  {
    width: 230,
    key: 'firstName',
    title: 'First Name',
    dataIndex: 'firstName',
    sorter: true,
  },
  {
    width: 230,
    key: 'lastName',
    title: 'Last Name',
    dataIndex: 'lastName',
    sorter: true,
  },
  {
    width: 220,
    key: 'companyName',
    title: 'Company Name',
    dataIndex: 'companyName',
    sorter: true,
  },
  {
    width: 150,
    key: 'companyType',
    title: 'Company Type',
    dataIndex: 'companyType',
    sorter: true,
    render: (value: CompanyType): ReactNode => companyTypeNames[value],
  },
  {
    width: 230,
    key: 'title',
    title: 'Job title',
    dataIndex: 'title',
    sorter: true,
  },
  {
    width: 230,
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    width: 130,
    key: 'isActive',
    title: 'Active Status',
    dataIndex: 'isActive',
    render: (text: string, record: any) => (
      <Paragraph
        className={`${styles.accountStatus} ${styles.accountStatusContacts}`}
      >
        <span className={record?.isActive ? styles.on : '$'} />
        {record?.isActive ? 'Active' : 'Inactive'}
      </Paragraph>
    ),
    sorter: true,
  },
  {
    width: 230,
    key: 'lastLoginDate',
    title: 'Last Logged In',
    dataIndex: 'lastLoginDate',
    render: (lastLoginDate: Date): ReactNode =>
      lastLoginDate
        ? formatInTimeZone(`${lastLoginDate}Z`, 'America/New_York', 'Pp z')
        : '',
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
  {
    width: 180,
    key: 'action',
    title: 'Action',
    dataIndex: 'action',
    render: (value: any, record: AllUsers): ReactNode => (
      <Button
        className={`${styles.resetPasswordBtn}`}
        type="text"
        onClick={() => initiatePasswordResetAdmin(record.username)}
        title="Initiate Password Reset"
      >
        Initiate Password Reset
      </Button>
    ),
  },
  {
    width: 230,
    key: 'username',
    title: 'Username',
    dataIndex: 'username',
    sorter: true,
  },
];
