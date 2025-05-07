import React, { FC, useCallback, useEffect, useState } from 'react';
import { cdfiStore, userStore } from 'store';
import { WithCompanyTypeProps } from './types';
import { PageSectionWrapper } from '../../../../components';
import {Input, Space, Table} from 'antd';
import { CdfiContact, CdfiContactEditFormData } from 'types';
import { useCdfiContacts, useCdfiOrgDetails } from '../../../../dataManagement';
import {
  makeCdfiContactsColumns,
  makeCdfiContactsColumnsEdit,
} from './makeCdfiContactsColumns';
import { CdfiContactEdit } from '../../../../forms/shared/Contacts/CdfiContactEdit';
import { actionButtons, cdfiContactCreateDefaultValues } from './constants';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './LogoHeader';
import { useHistory } from 'react-router-dom';
import tableStyles from 'components/ManageTableStyles.module.scss';
import styles from "../SubscriberDashboard/SubscriberActivities.module.scss";
import {SearchOutlined} from "@ant-design/icons";
import {handleFilter} from "../../../../tools/searchBarTools/handleFilter";

type ContactsData = CdfiContact & {
  key: React.Key;
};

function addIndexAsKey(data: CdfiContact[]): ContactsData[] {
  return data.map((subscriber, index) => ({ key: index, ...subscriber }));
}

export const ContactsDashboard: FC<WithCompanyTypeProps> = () => {
  const { cdfiId } = cdfiStore;
  const { data: cdfiData } = useCdfiOrgDetails(cdfiId);
  const history = useHistory();

  const { data: contacts } = useCdfiContacts(cdfiId);
  const contactsWithIndex = addIndexAsKey(contacts ? contacts.contacts : []);
  const [editingContact, setEditingContact] = useState<
    CdfiContactEditFormData | undefined
  >();
  const [editingContactId, setEditingContactId] = useState<
    number | undefined
  >();


  const [filterValue, setFilterValue] = useState('');
  const [filtered, setFiltered] = useState<ContactsData[]>(contactsWithIndex);

  useEffect(() => {
    setFiltered(handleFilter(filterValue, contactsWithIndex));
  }, [filterValue, contacts ]);

  useEffect(() => {
    if (editingContactId) {
      setEditingContact(
        contacts.contacts.find((item) => item.id === editingContactId),
      );
    }
  }, [editingContactId]);

  const onCancel = useCallback(() => {
    setEditingContact(undefined);
    setEditingContactId(undefined);
  }, []);

  const onFinishEdit = useCallback(() => {
    setEditingContact(undefined);
    setEditingContactId(undefined);
  }, [contacts]);

  const startAdd = useCallback(() => {
    setEditingContact(cdfiContactCreateDefaultValues);
  }, []);

  const logo = useCdfiLogo(cdfiId);

  const columns = (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor)
    ? makeCdfiContactsColumnsEdit(history, setEditingContactId)
    : makeCdfiContactsColumns();

  return (
    <PageSectionWrapper
      title="Contacts"
      ratings
      topTitle={<LogoHeader imgPath={logo} subTitle={cdfiData?.cdfi.name} />}
      actionButtons={
        (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) ? actionButtons(startAdd) : undefined
      }
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
      {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) && (
        <CdfiContactEdit
          data={editingContact}
          onFinish={onFinishEdit}
          onCancel={onCancel}
        />
      )}
      <Table
        dataSource={filtered}
        showSorterTooltip
        columns={columns}
        pagination={{ showSizeChanger: true }}
        size={'small'}
        className={tableStyles.table}
      />
    </PageSectionWrapper>
  );
};
