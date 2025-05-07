import { Tabs } from 'antd';
import React, { FC, useState } from 'react';
import { tableTabs } from './constants';
import { useCustomDataReports } from 'dataManagement/useCustomDataReports';
import { CustomDataReportsTable } from './CustomDataReportsTable';

const { TabPane } = Tabs;

export const CustomDataReportsView: FC = () => {
  const [activeKey, setActiveKey] = useState<string>('EXTERNAL');
  const { data } = useCustomDataReports();

  return (
    <Tabs
      type="card"
      tabBarStyle={{ borderBottom: '1px solid #77b3cc' }}
      defaultActiveKey={activeKey}
      tabBarGutter={4}
      onChange={setActiveKey}
    >
      <TabPane tab={tableTabs.internal} key="INTERNAL">
        <CustomDataReportsTable
          data={data ? data.internal : []}
        ></CustomDataReportsTable>
      </TabPane>
      <TabPane tab={tableTabs.external} key="EXTERNAL">
        <CustomDataReportsTable
          data={data ? data.external : []}
        ></CustomDataReportsTable>
      </TabPane>
    </Tabs>
  );
};
