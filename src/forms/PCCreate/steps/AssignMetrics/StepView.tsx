import React, { FC } from 'react';
import { Form, Typography, Tabs } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { AssignedMetric, VoidFn, Portfolio, GlobalMetric } from 'types';
import { Nullable } from 'types/utility';
import { MetricRowItem } from 'types/metricTableItem';
import { typography } from 'constants/typography';
import { MetricsTable, TabPanel } from 'components';
import { formName } from 'forms/PCCreate/constants';
import { generateFormId } from 'tools/formTools';
import {
  tableTabs,
  globalMetricsColumns,
  portfolioMetricsColumns,
} from './constants';
import styles from './AssignMetrics.module.scss';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const { metricAssignTitle, metricAssignDescription } = typography(
  'portfolioCompanyCreation',
);

type TabKey = keyof typeof tableTabs;
type StepViewProps = {
  onFinish: VoidFn;
  globalMetrics: GlobalMetric[];
  portfolioMetrics: AssignedMetric[];
  isLoading: boolean;
  portfolio: Nullable<Portfolio>;
  rowSelection: TableRowSelection<MetricRowItem>;
  tabKey: TabKey;
  setTabKey: (tabKey: TabKey) => void;
  stepNumber: number;
};

export const StepView: FC<StepViewProps> = ({
  onFinish,
  tabKey,
  setTabKey,
  globalMetrics,
  portfolioMetrics,
  isLoading,
  portfolio,
  rowSelection,
  stepNumber,
}) => {
  return (
    <Form
      size="large"
      labelCol={{ span: 24 }}
      id={generateFormId(formName, stepNumber)}
      onFinish={onFinish}
    >
      <Title level={2} className={styles.pageTitle}>
        {metricAssignTitle}
      </Title>
      <Paragraph type="secondary" className={styles.pageIntro}>
        {metricAssignDescription}
      </Paragraph>
      <TabPanel
        activeKey={tabKey}
        onChange={setTabKey as (key: string) => void}
        tabs={tableTabs}
      />
      <Tabs
        type="card"
        activeKey={tabKey}
        className={styles.tabs}
        tabBarGutter={4}
        animated={false}
        renderTabBar={(): React.ReactElement => <React.Fragment />}
      >
        <TabPane tab={tableTabs.global} key="global">
          <div className={styles.tableIntro}>
            Current list of all available metrics
          </div>
          <MetricsTable
            id="globalMetricsTable"
            layout="fixed"
            dataSource={globalMetrics}
            rowSelection={rowSelection}
            className={styles.table}
            isLoading={isLoading}
            columnNamesList={globalMetricsColumns}
          />
        </TabPane>
        <TabPane tab={tableTabs.portfolio} key="portfolio">
          <div className={styles.tableIntro}>
            Current list of metrics in the “{portfolio?.name}” Portfolio.
          </div>
          <MetricsTable
            dataSource={portfolioMetrics}
            rowSelection={rowSelection}
            id="portfolioMetricsTable"
            layout="fixed"
            isLoading={isLoading}
            columnNamesList={portfolioMetricsColumns}
          />
        </TabPane>
      </Tabs>
    </Form>
  );
};
