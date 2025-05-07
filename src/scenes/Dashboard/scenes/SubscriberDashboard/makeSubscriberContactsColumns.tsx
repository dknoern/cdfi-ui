import React, { ReactNode } from 'react';
import { Typography, Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { sortByString, sortByBoolean } from 'tools';
import styles from './makeSubscriberContactsColumns.module.scss';
import { ColumnProps } from 'antd/lib/table';
import { SubscriberContact } from 'types';
import { FaMask } from 'react-icons/fa';
import { processImpersonate } from '../../../../flows/Impersonate/tools';
import { userStore } from '../../../../store';
import { format } from 'date-fns-tz';
import moment from 'moment';

const { Paragraph } = Typography;

export const makeSubscriberContactsColumns = (
  history: any,
  setEditingContactId: (value: number | undefined) => void,
): ColumnProps<SubscriberContact>[] => {
  const handleEditUserClick = (userId: number) => () => {
    setEditingContactId(userId);
  };

  const handleImpersonateUserClick = (userId: number) => () => {
    if (window.confirm('Are you sure you want to impersonate this user?')) {
      processImpersonate(userId, history);
    }
  };

  return userStore.isSubscriber
    ? [
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
              <span className={record?.isActive ? styles.on : '$'} />
              {record?.isActive ? 'Active' : 'Inactive'}
            </Paragraph>
          ),
          sorter: (a, b): number => sortByBoolean(a.isActive, b.isActive),
        },
      ]
    : [
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
              <span className={record?.isActive ? styles.on : '$'} />
              {record?.isActive ? 'Active' : 'Inactive'}
            </Paragraph>
          ),
          sorter: (a, b): number => sortByBoolean(a.isActive, b.isActive),
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
        {
          title: '',
          dataIndex: 'actions',
          render: (value, contact): ReactNode => (
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
