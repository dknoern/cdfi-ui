import React, { ReactNode, MouseEventHandler } from 'react';
import { Button } from 'antd';
import {
  DeleteFilled,
  EditFilled,
} from '@ant-design/icons';
import { sortByString, formatPhoneNumber } from 'tools';
import { ColumnGenerator, OperationName, ColumnGeneratorSubscriberContact } from '../types';

const getPhoneDisplayValue = (phone? : string, phoneExt? : string): string => {
  let displayVal = '';

  if (phone) {
    displayVal += formatPhoneNumber(phone);
    if (phoneExt) {
      displayVal += ', Ext. ' + phoneExt;
    }
  } else {
    if (phoneExt) {
      displayVal += 'Ext. ' + phoneExt;
    }
  }

  return displayVal;
};

export const makeColumns: ColumnGenerator = (handle, isCreateView = true) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const operationName = e.currentTarget.name as OperationName;
    handle(operationName, Number(e.currentTarget.value));
  };

  return [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Job Title',
      sorter: (a, b): number => sortByString(a.title, b.title),
    },
    {
      key: 'fullName',
      dataIndex: 'fullName',
      title: 'Full Name',
      sorter: (a, b): number => sortByString(a.fullName, b.fullName),
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
      sorter: (a, b): number => sortByString(a.email, b.email),
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: 'Phone #',
      render: (value, contact): ReactNode => (
        getPhoneDisplayValue(contact.phone, contact.phoneExtension)
      ),
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      render: (value, contact): ReactNode => (
        <>
          <Button
            type="link"
            onClick={clickHandler}
            name="edit"
            value={contact.id}
            icon={<EditFilled />}
            title="Edit user"
          />
          <Button
            type="link"
            onClick={clickHandler}
            name="delete"
            value={contact.id}
            icon={<DeleteFilled />}
            title="Delete user"
          />
        </>
      ),
    },
  ];
};

export const makeColumnsSubscriberContacts: ColumnGeneratorSubscriberContact = (handle, isCreateView = true) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const operationName = e.currentTarget.name as OperationName;
    handle(operationName, Number(e.currentTarget.value));
  };

  return [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Job Title',
      sorter: (a, b): number => sortByString(a.title, b.title),
    },
    {
      key: 'fullName',
      dataIndex: 'fullName',
      title: 'Full Name',
      sorter: (a, b): number => sortByString(a.fullName, b.fullName),
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
      sorter: (a, b): number => sortByString(a.email, b.email),
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: 'Phone #',
      render: (value, contact): ReactNode => (
        getPhoneDisplayValue(contact.phone, contact.phoneExtension)
      ),
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: '',
      render: (value, contact): ReactNode => (
        <>
          <Button
            type="link"
            onClick={clickHandler}
            name="edit"
            value={contact.id}
            icon={<EditFilled />}
            title="Edit user"
          />
          <Button
            type="link"
            onClick={clickHandler}
            name="delete"
            value={contact.id}
            icon={<DeleteFilled />}
            title="Delete user"
          />
        </>
      ),
    },
  ];
};

