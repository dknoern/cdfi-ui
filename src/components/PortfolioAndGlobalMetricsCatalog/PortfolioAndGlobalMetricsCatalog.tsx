import React, { FC, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { Metric, Portfolio, AssignedMetric } from 'types';
import { MetricRowItem } from 'types/metricTableItem';
import {
  MetricsTable,
  TabPanel,
  EditMetricsLine,
  FrequencyPopover,
} from 'components';
import {
  usePortfolioMetrics,
  useGlobalMetrics,
  useCompanyMetrics,
} from 'dataManagement';
import { getPopupContainer } from 'tools/antConfig';
import { workDataStore } from 'store';
import {
  tableTabs,
  globalMetricColumnsList,
  globalMetricColumnsWidth,
  portfolioMetricColumnsList,
  portfolioMetricColumnsWidth,
  MetricsCatalogTab,
} from './constants';
import { metricsStore } from './metricsStore';
import {
  filterMetricsByIdsList,
  updateMetricFields,
  getExplanation,
} from './tools';
import styles from './PortfolioAndGlobalMetricsCatalog.module.scss';

const { TabPane } = Tabs;

type PortfolioAndGlobalMetricsCatalogProps = {
  portfolioId: Portfolio['id'];
  tabKey: MetricsCatalogTab;
  onTabChange: (tabKey: MetricsCatalogTab) => void;
  onSelectionChange?: (selectedRowKeys: Metric['id'][]) => void;
};

export const PortfolioAndGlobalMetricsCatalogFn: FC<PortfolioAndGlobalMetricsCatalogProps> = ({
  portfolioId,
  tabKey,
  onTabChange,
  onSelectionChange,
}) => {
  const { companyId } = workDataStore.viewModeConfig;
  const {
    globalMetrics: storeGlobalMetrics,
    portfolioMetrics: storePortfolioMetrics,
    selectedIds,
  } = metricsStore;

  const {
    data: assignedMetrics,
    isLoading: isCompanyMetricsLoading,
  } = useCompanyMetrics(companyId ?? 0);

  const {
    data: portfolioMetrics,
    isLoading: isPortfolioMetricsLoading,
  } = usePortfolioMetrics(portfolioId ?? 0);
  const {
    data: globalMetrics,
    isLoading: isGlobalMetricsLoading,
  } = useGlobalMetrics();

  useEffect(() => {
    metricsStore.init(globalMetrics ?? [], portfolioMetrics ?? []);
  }, [globalMetrics, portfolioMetrics]);

  useEffect(() => {
    metricsStore.setSelectedIds([]);
  }, []);

  useEffect(() => {
    if (onSelectionChange) onSelectionChange(selectedIds);
  }, [onSelectionChange, selectedIds]);

  const rowSelection: TableRowSelection<MetricRowItem> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      metricsStore.setSelectedIds(selectedRowKeys as Metric['id'][]);
    },
    selectedRowKeys: selectedIds,
  };

  const updatePortfolioMetrics = useCallback(
    (setData) => {
      const newItems = updateMetricFields(
        [...metricsStore.portfolioMetrics],
        selectedIds,
        setData,
      );
      metricsStore.setPortfolioMetricData(newItems);
    },
    [selectedIds],
  );

  const handleTabChange = useCallback(
    (key) => {
      if (key === 'portfolio') {
        metricsStore.setSelectedIds(
          filterMetricsByIdsList(portfolioMetrics ?? [], selectedIds),
        );
      }
      onTabChange(key);
    },
    [onTabChange, portfolioMetrics, selectedIds],
  );

  const getUnassignedMetrics = useCallback(
    (allMetrics: Omit<AssignedMetric, 'status'>[]) => {
      if (isCompanyMetricsLoading) return [];

      const assignedMetricIds = (assignedMetrics ?? []).map(
        (metric) => metric.id,
      );

      return (allMetrics ?? []).filter(
        (metric) => !assignedMetricIds.includes(metric.id),
      );
    },
    [isCompanyMetricsLoading, assignedMetrics],
  );

  return (
    <>
      <TabPanel
        activeKey={tabKey}
        onChange={handleTabChange}
        tabs={tableTabs}
      />
      <Tabs
        type="card"
        activeKey={tabKey}
        tabBarGutter={4}
        animated={false}
        renderTabBar={(): React.ReactElement => <React.Fragment />}
      >
        <TabPane
          tab={tableTabs.global}
          key={MetricsCatalogTab.Global}
          className={styles.globalMetricsTab}
        >
          <MetricsTable
            id="globalMetrics"
            dataSource={getUnassignedMetrics(storeGlobalMetrics)}
            columnNamesList={globalMetricColumnsList}
            isLoading={isGlobalMetricsLoading}
            rowSelection={rowSelection}
            scroll={{ y: 500, x: 1200 }}
            columnWidth={globalMetricColumnsWidth}
            getPopupContainer={getPopupContainer}
          />
          {getExplanation(assignedMetrics)}
        </TabPane>
        <TabPane tab={tableTabs.portfolio} key={MetricsCatalogTab.Portfolio}>
          <div className={styles.editMetricWrapper}>
            <EditMetricsLine selectedMetricIds={selectedIds}>
              <FrequencyPopover
                selectedMetricIds={selectedIds}
                setParam={updatePortfolioMetrics}
                showIcon
              />
            </EditMetricsLine>
          </div>
          <MetricsTable
            id="portfolioMetrics"
            dataSource={getUnassignedMetrics(storePortfolioMetrics)}
            columnNamesList={portfolioMetricColumnsList}
            isLoading={isPortfolioMetricsLoading}
            rowSelection={rowSelection}
            scroll={{ y: 500, x: 1200 }}
            columnWidth={portfolioMetricColumnsWidth}
            getPopupContainer={getPopupContainer}
          />
          {getExplanation(assignedMetrics)}
        </TabPane>
      </Tabs>
    </>
  );
};

export const PortfolioAndGlobalMetricsCatalog = observer(
  PortfolioAndGlobalMetricsCatalogFn,
);
