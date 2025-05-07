import { Table } from 'antd';
import { useSupportHistory } from 'dataManagement/useSupportHistory';
import React, { FC } from 'react';
import { cdfiStore, subscriberStore, userStore } from 'store';
import { SupportHistoryData, SupportHistory } from 'types/supportHistory';
import { makeSupportHistoryColumns } from './makeSupportHistoryColumns';
import tableStyles from 'components/ManageTableStyles.module.scss';

function addIdAsKey(data: SupportHistory[]): SupportHistoryData[] {
  return data.map((supportHistory) => ({ key: supportHistory.id, ...supportHistory }));
}

export const SupportHistoryView: FC = () => {
  const { subscriberId } = subscriberStore;
  const { cdfiId } = cdfiStore;

  const id =
    userStore.isSubscriber || userStore.isCdfi
      ? userStore.companyId
      : subscriberId
      ? subscriberId
      : cdfiId;

  const { data } = useSupportHistory(id);

  return (
    <Table
      pagination={{ showSizeChanger: true }}
      dataSource={data ? addIdAsKey(data.supportHistory) : []}
      columns={makeSupportHistoryColumns()}
      className={tableStyles.table}
      showSorterTooltip
      />
  );
};
