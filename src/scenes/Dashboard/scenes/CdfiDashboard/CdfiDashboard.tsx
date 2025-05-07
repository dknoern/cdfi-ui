import React, { FC, useState } from 'react';
import { WithCompanyTypeProps } from './types';
import { PageSectionWrapper } from 'components';
import { tableTabs } from '../AdminDashboard/scenes/GlobalDashboard/components/AdminDashboard/constants';
import { RecentActivities } from '../AdminDashboard/scenes/GlobalDashboard/components/Activities/RecentActivities';
import { Tabs } from 'antd';
import {
  useCdfiActivities,
  deleteCdfiActivities,
  useActionItems,
  useCdfis,
} from 'dataManagement';
import { CurrentlyDueTable } from './CurrentlyDueTable';
import {cdfiStore, userStore} from 'store';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './LogoHeader';
import { CdfiMetricVarianceTable } from './CdfiMetricVarianceHistory';
import {
  AerisExplorerHistoryTable
} from "../AdminDashboard/scenes/GlobalDashboard/components/Activities/AerisExplorerHistory";
import { useAppConfig } from '../../../../useAppConfig';

const { TabPane } = Tabs;

export const CdfiDashboard: FC<WithCompanyTypeProps> = () => {
  const { cdfiId } = cdfiStore;
  const { data: cdfis } = useCdfis();
  const { data: cdfiData } = useCdfiActivities(cdfiId);
  const { data: actionItems } = useActionItems(cdfiId);
  const cdfiName = cdfis?.find((item) =>
    item.id == cdfiId ? item.name : '',
  )?.name;

  const { METRIC_VARIANCE_ENABLED, NEW_AERIS_EXPLORER_ENABLED } = useAppConfig();

  const deleteByCdfiId = (activityIds: string[]): Promise<void> => {
    return deleteCdfiActivities(activityIds, cdfiId);
  };

  const logo = useCdfiLogo(cdfiId);

  return (
    <PageSectionWrapper
      topTitle={<LogoHeader imgPath={logo} subTitle={cdfiName} />}
      title="Monitor Recent Activities"
      ratings
    >
      <Tabs
        type="card"
        tabBarStyle={{ borderBottom: '1px solid #77b3cc' }}
        defaultActiveKey="cdfi"
        tabBarGutter={4}
      >
        <TabPane tab={tableTabs.cdfi} key="cdfi">
          <RecentActivities
            data={cdfiData ? cdfiData.cdfi : []}
            onDelete={deleteByCdfiId}
          />
        </TabPane>
        <TabPane tab={tableTabs.subscribers} key="subscribers">
          <RecentActivities
            data={cdfiData ? cdfiData.subscribers : []}
            onDelete={deleteByCdfiId}
          />
        </TabPane>
        <TabPane tab={tableTabs.aeris} key="aeris">
          <RecentActivities
            data={cdfiData ? cdfiData.aeris : []}
            onDelete={deleteByCdfiId}
          />
        </TabPane>
        {(METRIC_VARIANCE_ENABLED && (userStore.isAerisAdmin || userStore.isContractor || userStore.isStaff)) && (
            <TabPane tab={tableTabs.dataVariance} key="dataVariance">
              <CdfiMetricVarianceTable companyId={cdfiId} />
            </TabPane>
          )}
        {(NEW_AERIS_EXPLORER_ENABLED && (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor)) &&
          <TabPane tab={tableTabs.aeriesExplorer} key="aerisExplorer">
            <AerisExplorerHistoryTable companyId={cdfiId} />
          </TabPane>
        }
      </Tabs>
      <CurrentlyDueTable
        data={actionItems ? actionItems.actionItems : []}
        cdfiId={cdfiId}
      />
    </PageSectionWrapper>
  );
};
