import React, { ReactNode } from 'react';
import { Typography, Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { sortByString, sortByBoolean } from 'tools';
import styles from './OrganizationDetails.module.scss';
import { CdfiContact } from 'types';
import { ColumnProps } from 'antd/lib/table';
import { processImpersonate } from '../../../../flows/Impersonate/tools';
import { FaMask } from 'react-icons/fa';
import { format } from 'date-fns-tz';
import moment from 'moment';

const { Paragraph } = Typography;

export const makeCdfiContactsColumns = (): ColumnProps<CdfiContact>[] => {
  return [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b): number => sortByString(a.username, b.username),
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      render: (text: string, record: any) =>
        record.firstName + ' ' + record.lastName,
      sorter: (a, b): number => sortByString(a.firstName, b.firstName),
    },
    {
      title: 'Job Title',
      dataIndex: 'title',
      sorter: (a, b): number => sortByString(a.title, b.title),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b): number => sortByString(a.email, b.email),
    },
    {
      title: 'Active Status',
      dataIndex: 'isActive',
      render: (text: string, record: any) => (
        <Paragraph
          className={`${styles.accountStatus} ${styles.accountStatusContacts}`}
        >
          <span className={record?.isActive ? styles.on : '$'}></span>
          {record?.isActive ? 'Active' : 'Inactive'}
        </Paragraph>
      ),
      sorter: (a, b): number => sortByBoolean(a.isActive, b.isActive),
    },
  ];
};

export const makeCdfiContactsColumnsEdit = (
  history: any,
  setEditingContactId: (value: number | undefined) => void,
): ColumnProps<CdfiContact>[] => {
  const handleEditUserClick = (userId: number) => () => {
    setEditingContactId(userId);
  };

  const handleImpersonateUserClick = (userId: number) => () => {
    if (window.confirm('Are you sure you want to impersonate this user?')) {
      processImpersonate(userId, history);
    }
  };

  return [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a: CdfiContact, b: CdfiContact): number =>
        sortByString(a.username, b.username),
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      render: (text: string, record: any) =>
        record.firstName + ' ' + record.lastName,
      sorter: (a: CdfiContact, b: CdfiContact): number =>
        sortByString(a.firstName, b.firstName),
    },
    {
      title: 'Job Title',
      dataIndex: 'title',
      sorter: (a: CdfiContact, b: CdfiContact): number =>
        sortByString(a.title, b.title),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: CdfiContact, b: CdfiContact): number =>
        sortByString(a.email, b.email),
    },
    {
      width: 180,
      title: 'Active Status',
      dataIndex: 'isActive',
      render: (text: string, record: any) => (
        <Paragraph
          className={`${styles.accountStatus} ${styles.accountStatusContacts}`}
        >
          <span className={record?.isActive ? styles.on : '$'}></span>
          {record?.isActive ? 'Active' : 'Inactive'}
        </Paragraph>
      ),
      sorter: (a: CdfiContact, b: CdfiContact): number =>
        sortByBoolean(a.isActive, b.isActive),
    },
    {
      width: 230,
      key: 'dateCreated',
      title: 'Date Created',
      dataIndex: 'dateCreated',
      render: (dateCreated: Date): ReactNode =>
        dateCreated ? format(new Date(dateCreated), 'MM/dd/yyyy') : '',
      sorter: (a, b) =>
        moment(a.dateCreated).unix() - moment(b.dateCreated).unix(),
    },
    {
      title: '',
      dataIndex: '',
      render: (value: any, contact: CdfiContact): ReactNode => (
        <>
          <Button
            type="link"
            onClick={handleEditUserClick(contact.id)}
            name="edit"
            value={contact.id}
            icon={<EditFilled />}
            title="Edit user"
          />

          <Button
            type="link"
            onClick={handleImpersonateUserClick(contact.id)}
            name="impersonate"
            value={contact.id}
            icon={<FaMask />}
            title="Impersonate user"
          />
        </>
      ),
    },
  ];
};
