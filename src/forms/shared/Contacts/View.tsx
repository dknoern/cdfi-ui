import React, { FC } from 'react';
import { Table } from 'antd';
import { CdfiContact, SubscriberContact } from 'types';
import { CdfiContactActionPerformer, SubscriberContactActionPerformer } from './types';
import { makeColumns, makeColumnsSubscriberContacts } from './tools';
import styles from './Contacts.module.scss';

export const View: FC<{
  value: CdfiContact[];
  handleAction: CdfiContactActionPerformer;
  isCreateView?: boolean;
}> = ({ value, handleAction, isCreateView }) => {
  const columns = makeColumns((operationName, id) => {
    handleAction(operationName, id, value);
  }, isCreateView);

  return (
    <Table
      columns={columns}
      dataSource={value.map((item) => ({
        ...item,
        key: item.id,
        fullName: `${item.firstName} ${item.lastName}`,
      }))}
      pagination={false}
      className={styles.narrow}
    />
  );
};

export const ViewSubscriberContact: FC<{
  value: SubscriberContact[];
  handleAction: SubscriberContactActionPerformer;
  isCreateView?: boolean;
}> = ({ value, handleAction, isCreateView }) => {
  const columns = makeColumnsSubscriberContacts((operationName, id) => {
    handleAction(operationName, id, value);
  }, isCreateView);

  return (
    <Table
      columns={columns}
      dataSource={value.map((item) => ({
        ...item,
        key: item.id,
        fullName: `${item.firstName} ${item.lastName}`,
      }))}
      pagination={false}
      className={styles.narrow}
    />
  );
};
