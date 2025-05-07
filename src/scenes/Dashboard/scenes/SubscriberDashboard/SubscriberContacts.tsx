import {Input, Space, Table} from 'antd';
import { SubscriberContactEdit } from 'forms/shared/Contacts/SubscriberContactEdit';
import React, { FC, useCallback, useState, useEffect } from 'react';
import {subscriberStore, userStore} from 'store';
import { SubscriberContact, SubscriberContactEditFormData } from 'types';
import { PageSectionWrapper } from '../../../../components';
import {
  useSubscriberContacts,
  useSubscribers,
} from '../../../../dataManagement';
import {
  actionButtons,
  subscriberContactCreateDefaultValues,
} from './constants';
import { makeSubscriberContactsColumns } from './makeSubscriberContactsColumns';
import styles from './SubscriberActivities.module.scss';
import { WithCompanyTypeProps } from './types';
import { useHistory } from 'react-router-dom';
import {SearchOutlined} from "@ant-design/icons";
import {handleFilter} from "../../../../tools/searchBarTools/handleFilter";


type ContactsData = SubscriberContact & {
  key: React.Key;
};

function addIndexAsKey(data: SubscriberContact[]): ContactsData[] {
  return data.map((subscriber, index) => ({ key: index, ...subscriber }));
}

export const SubscriberContacts: FC<WithCompanyTypeProps> = (props) => {
  const { subscriberItem } = subscriberStore;
  const subscriberId = subscriberStore.subscriberId ?  subscriberStore.subscriberId: 1;
  const title = subscriberStore.subscriberId ? 'Contacts': 'Public Non-Subscribers';
  const id = subscriberItem && subscriberItem.id;

  const { data: subscribers } = useSubscribers();
  const subscriberName = subscribers?.find((item) =>
    item.id == (userStore.isSubscriber ? id : subscriberId) ? item.name : '',
  )?.name;
  const history = useHistory();

  const { data: contacts } = useSubscriberContacts(userStore.isSubscriber ? id : subscriberId);
  const contactsWithIndex = addIndexAsKey(contacts ? contacts.contacts : []);
  const [editingContact, setEditingContact] = useState<
    SubscriberContactEditFormData | undefined
  >();
  const [editingContactId, setEditingContactId] = useState<number | undefined>();

  const [filterValue, setFilterValue] = useState('');
  const [filtered, setFiltered] = useState<ContactsData[]>(contactsWithIndex);

  useEffect(() => {
    setFiltered(handleFilter(filterValue, contactsWithIndex));
  }, [filterValue, contacts ]);

  useEffect(() => {
    if (editingContactId) {
      setEditingContact(contacts.contacts.find((item) => item.id === editingContactId))
    }
  }, [editingContactId])

  const columns = makeSubscriberContactsColumns(history, setEditingContactId);

  const onCancel = useCallback(() => {
    setEditingContact(undefined);
    setEditingContactId(undefined);
  }, []);

  const onFinishEdit = useCallback(() => {
    setEditingContact(undefined);
    setEditingContactId(undefined);
  }, [contacts]);

  const startAdd = useCallback(() => {
    setEditingContact(subscriberContactCreateDefaultValues);
  }, []);

  return (
    <PageSectionWrapper
      title={title}
      topTitle={userStore.isSubscriber ? subscriberItem?.name : subscriberName}
      actionButtons={!userStore.isSubscriber ? actionButtons(startAdd) : undefined}
    >
      <Space className={styles.tableSearchBar}>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            setFilterValue(e.target.value.toLowerCase());
          }}
          placeholder='Search users...'
          allowClear
          suffix={<SearchOutlined />}
        />
      </Space>
      {!userStore.isSubscriber ?
        <SubscriberContactEdit
          data={editingContact}
          onFinish={onFinishEdit}
          onCancel={onCancel}
        /> : null}
      <Table
        className={styles.contactsTable}
        dataSource={filtered}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        size={'small'}
        showSorterTooltip
      />
    </PageSectionWrapper>
  );
};
