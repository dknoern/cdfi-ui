import React, { ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { PersonRole, User } from 'types';
import { sortByBoolean, sortByString } from 'tools';
import { personRoleNames } from 'constants/roles';
import { format } from 'date-fns-tz';
import moment from 'moment';

export const columns: ColumnProps<User>[] = [
  {
    key: 'name',
    dataIndex: 'firstName',
    title: 'First Name',
    width: 200,
    sorter: (a, b): number => sortByString(a.firstName, b.firstName),
  },
  {
    key: 'surname',
    dataIndex: 'lastName',
    title: 'Last Name',
    width: 200,
    sorter: (a, b): number => sortByString(a.lastName, b.lastName),
  },
  {
    key: 'role',
    dataIndex: 'role',
    title: 'Type',
    width: 200,
    sorter: (a, b): number => sortByString(a.role, b.role),
    render: (value: PersonRole): ReactNode => personRoleNames[value],
  },
  {
    key: 'email',
    dataIndex: 'email',
    title: 'Email',
    width: 200,
    sorter: (a, b): number => sortByString(a.email, b.email),
  },
  {
    key: 'username',
    dataIndex: 'username',
    title: 'Username',
    width: 200,
    sorter: (a, b): number => sortByString(a.username, b.username),
  },
  {
    key: 'active',
    dataIndex: 'isActive',
    title: 'Status',
    sorter: (a, b): number => sortByBoolean(a.isActive, b.isActive),
    render: (value: boolean): ReactNode => (
      <span>{value ? 'Active' : 'Not Active'}</span>
    ),
  },
  {
    key: 'dateCreated',
    title: 'Date Created',
    dataIndex: 'dateCreated',
    render: (dateCreated: Date): ReactNode =>
      dateCreated ? format(new Date(dateCreated), 'MM/dd/yyyy') : '',
    sorter: (a, b) =>
      moment(a.dateCreated).unix() - moment(b.dateCreated).unix(),
  },
];
