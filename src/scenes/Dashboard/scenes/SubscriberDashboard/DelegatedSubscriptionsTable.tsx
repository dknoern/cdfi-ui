import React, { FC } from 'react';
import { PageSectionWrapper } from '../../../../components';
import { Table } from 'antd';
import { delegatedSubscriptionsColumns } from './constants';
import { DelegatedSubscription } from 'types';
import styles from './SubscriberActivities.module.scss';

interface DelegatedSubscriptionsProps {
  data: DelegatedSubscription[];
}

type DelegatedSubscriptionsData = DelegatedSubscription & {
  key: React.Key;
};

function addIndexAsKey(
  data: DelegatedSubscription[],
): DelegatedSubscriptionsData[] {
  return data.map((subscription, index) => ({ key: index, ...subscription }));
}

export const DelegatedSubscriptionsTable: FC<DelegatedSubscriptionsProps> = (
  props,
) => {
  const data = addIndexAsKey(props.data);

  return (
    <PageSectionWrapper title='Access Granted By CDFIs'>
      <Table
        className={styles.contactsTable}
        dataSource={data}
        columns={delegatedSubscriptionsColumns}
        pagination={{ showSizeChanger: true }}
        size={'small'}
        scroll={{ y: '50vh' }}
      />
    </PageSectionWrapper>
  );
};
