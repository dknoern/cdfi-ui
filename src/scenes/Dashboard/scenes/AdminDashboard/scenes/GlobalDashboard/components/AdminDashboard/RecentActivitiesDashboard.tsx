import React, { FC, useEffect, useState } from 'react';
import { PageSectionWrapper } from 'components';
import { Tabs } from 'antd';
import { deleteActivities } from 'dataManagement';
import { recentActivitiesStore, userStore } from 'store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { tableTabs } from './constants';
import { RecentActivitiesGlobal } from '../ActivitiesGlobal/RecentActivitiesGlobal';
import { CompanyAssignmentStatusUpdate } from 'scenes/Dashboard/scenes/AdminDashboard/components/CompanyAssignmentStatusUpdate';
import { AerisExplorerHistoryTable } from '../Activities/AerisExplorerHistory';
import { useAppConfig } from '../../../../../../../../useAppConfig';

const { TabPane } = Tabs;

export const RecentActivitiesDashboard: FC = observer(() => {
  const [activeKey, setActiveKey] = useState<string>('cdfi');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const {
    recentActivitiesGlobal,
    getRecentActivitiesGlobal,
    recentDataVarianceActivities,
    getDataVarianceRecentActivities,
    setPagination,
    setLoading,
    searchActivities,
    isAssignmentStatusModalVisible,
    assignmentStatusFormData,
    closeAssignmentStatusModal,
  } = recentActivitiesStore;

  const { METRIC_VARIANCE_ENABLED, NEW_AERIS_EXPLORER_ENABLED } = useAppConfig();

  const handleOnAssignment = () => {
    closeAssignmentStatusModal();
    setRefreshTrigger(refreshTrigger + 1);
  };

  useEffect(() => {
    setPagination({ current: 0, pageSize: 100 });
    setLoading(true);

    // These are for components which load their own data
    if (activeKey === 'aeriesExplorer') {
      return;
    }

    if (activeKey === 'dataVariance') {
      getDataVarianceRecentActivities(
        undefined,
        undefined,
        undefined,
        true,
        0,
        100,
      ).then(() => {
          setLoading(false);
      });
      return;
    }
    getRecentActivitiesGlobal(activeKey, 0, 100, searchActivities).then(() => {
      setLoading(false);
    });
  }, [activeKey, refreshTrigger]);

  return (
    <>
      <PageSectionWrapper
        title={userStore.isAerisAdmin ? 'GLOBAL ADMIN DASHBOARD' : ''}
      >
        <PageSectionWrapper title="Monitor Recent Activities">
          <Tabs
            type="card"
            tabBarStyle={{ borderBottom: '1px solid #77b3cc' }}
            defaultActiveKey={activeKey}
            tabBarGutter={4}
            onChange={setActiveKey}
          >
            <TabPane tab={tableTabs.cdfi} key="cdfi">
              <RecentActivitiesGlobal
                id="globalSystemEmailTable"
                layout="fixed"
                dataSource={toJS(recentActivitiesGlobal.content)}
                scroll={{ y: 500 }}
                onDelete={deleteActivities}
                activeKey={activeKey}
              />
            </TabPane>
            {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) && (
              <TabPane tab={tableTabs.subscribers} key="investor">
                <RecentActivitiesGlobal
                  id="globalSystemEmailTable"
                  layout="fixed"
                  dataSource={toJS(recentActivitiesGlobal.content)}
                  scroll={{ y: 500 }}
                  onDelete={deleteActivities}
                  activeKey={activeKey}
                />
              </TabPane>
            )}
            <TabPane tab={tableTabs.aeris} key="cars">
              <RecentActivitiesGlobal
                id="globalSystemEmailTable"
                layout="fixed"
                dataSource={toJS(recentActivitiesGlobal.content)}
                scroll={{ y: 500 }}
                onDelete={deleteActivities}
                activeKey={activeKey}
              />
            </TabPane>
            {(METRIC_VARIANCE_ENABLED && (userStore.isAerisAdmin || userStore.isContractor || userStore.isStaff))
              && (
                <TabPane tab={tableTabs.dataVariance} key="dataVariance">
                  <RecentActivitiesGlobal
                    id="globalSystemEmailTable"
                    layout="fixed"
                    dataSource={toJS(recentDataVarianceActivities?.content)}
                    scroll={{ y: 500 }}
                    onDelete={deleteActivities}
                    activeKey={activeKey}
                  />
                </TabPane>
              )}
            {(NEW_AERIS_EXPLORER_ENABLED && (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor))
              && (
              <TabPane tab={tableTabs.aeriesExplorer} key="aeriesExplorer">
                <AerisExplorerHistoryTable />
              </TabPane>
            )}
          </Tabs>
          <CompanyAssignmentStatusUpdate
            isVisible={isAssignmentStatusModalVisible}
            onCancel={closeAssignmentStatusModal}
            formData={toJS(assignmentStatusFormData)}
            onFinish={handleOnAssignment}
          />
        </PageSectionWrapper>
      </PageSectionWrapper>
    </>
  );
});
