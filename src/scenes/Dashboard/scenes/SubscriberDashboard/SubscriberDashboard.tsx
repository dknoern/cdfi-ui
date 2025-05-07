import React, { FC, useState } from 'react';
import { WithCompanyTypeProps } from '../CdfiDashboard/types';
import { PageSectionWrapper } from 'components';
import { useSubscriberActivities, useSubscribers } from 'dataManagement';
import { tableTabs } from './constants';
import { subscriberStore } from 'store';
import { SubscriberActivities } from './SubscriberActivities';
import { Tabs } from 'antd';
import {
  AerisExplorerHistoryTable
} from "../AdminDashboard/scenes/GlobalDashboard/components/Activities/AerisExplorerHistory";

const { TabPane } = Tabs;

export const SubscriberDashboard: FC<WithCompanyTypeProps> = () => {
  const { data: subscribers } = useSubscribers();
  const { subscriberId } = subscriberStore;

  const subscriberName = subscribers?.find((item) =>
    item.id == subscriberId ? item.name : '',
  )?.name;
  const [activeKey, setActiveKey] = useState<string>('documents');
  const { data } = useSubscriberActivities(subscriberId);

  return (
    <>
      <PageSectionWrapper
        topTitle={subscriberName}
        title="Monitor Recent Activities"
      >
        <Tabs
          type="card"
          tabBarStyle={{ borderBottom: '1px solid #77b3cc' }}
          defaultActiveKey={activeKey}
          tabBarGutter={4}
          onChange={setActiveKey}
        >
          <TabPane tab={tableTabs.documents} key="documents">
            <SubscriberActivities data={data ? data.documents : []} />
          </TabPane>
          <TabPane tab={tableTabs.financials} key="financials">
            <SubscriberActivities data={data ? data.financials : []} />
          </TabPane>
          <TabPane tab={tableTabs.factSheets} key="factSheets">
            <SubscriberActivities data={data ? data.factSheets : []} />
          </TabPane>
          (userStore.isAerisAdmin ||
          <TabPane tab={tableTabs.aerisExplorer} key="aerisExplorer">
            <AerisExplorerHistoryTable companyId={subscriberId} />
          </TabPane>
          )
        </Tabs>
      </PageSectionWrapper>
    </>
  );
};
