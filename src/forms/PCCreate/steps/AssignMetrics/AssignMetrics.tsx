import React, {
  FC,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { TableRowSelection } from 'antd/lib/table/interface';
import { Metric, AssignedMetric } from 'types';
import { MetricRowItem } from 'types/metricTableItem';
import { stepContext } from 'forms/PCCreate/context';
import { formStore } from 'forms/PCCreate/formStore';
import { FormStep } from 'forms/PCCreate/types';
import { stepIndexByKey } from 'forms/PCCreate/tools';
import { useGlobalMetrics, usePortfolioMetrics } from 'dataManagement';
import { workDataStore } from 'store';
import { FormResult } from '../CustomizeMetrics/types';
import { tableTabs, CURRENT_STEP } from './constants';
import { setCustomizeMetrics } from '../CustomizeMetrics/tools';
import { StepView } from './StepView';

export const AssignMetrics: FC = () => {
  const { portfolio } = workDataStore;
  const [selected, setSelected] = useState<React.Key[]>(
    formStore.data[CURRENT_STEP]
      ? (formStore.data[CURRENT_STEP] as Metric['id'][])
      : [],
  );
  const [tabKey, setTabKey] = useState<keyof typeof tableTabs>('global');
  const {
    data: globalMetricsRaw,
    isLoading: globalIsLoading,
  } = useGlobalMetrics();
  const {
    data: portfolioMetricsRaw,
    isLoading: portfolioIsLoading,
  } = usePortfolioMetrics(portfolio?.id ?? 0);

  const globalMetrics = useMemo(
    () => (globalMetricsRaw as AssignedMetric[]) ?? [],
    [globalMetricsRaw],
  );

  const portfolioMetrics = useMemo(() => portfolioMetricsRaw ?? [], [
    portfolioMetricsRaw,
  ]);
  const portfolioMetricIds = new Set(portfolioMetrics.map((item) => item.id));

  const { state, dispatch: dispatchStep } = useContext(stepContext);

  useEffect(() => {
    dispatchStep({
      type: 'available',
      step: stepIndexByKey(FormStep.assignMetrics),
    });
  }, [dispatchStep]);

  const handleRowSelection = useCallback(
    (selectedRowKeys: React.Key[]) => {
      const createdMetrics = (
        (formStore.data[FormStep.customizeMetrics] as FormResult) ?? []
      ).filter((metric) => metric.isNew);

      let toSet = selectedRowKeys as Metric['id'][];

      if (tabKey === 'portfolio') {
        // need to merge selected with global items
        const current = (formStore.data[CURRENT_STEP] as Metric['id'][]) ?? [];
        const globalChecked = current.filter(
          (itemId) => !portfolioMetricIds.has(itemId),
        );

        toSet = toSet.concat(globalChecked);
      }

      setSelected(toSet);

      formStore.setData(CURRENT_STEP, toSet);

      setCustomizeMetrics(toSet, globalMetrics, createdMetrics);
    },
    [globalMetrics, portfolioMetricIds, tabKey],
  );

  const rowSelection: TableRowSelection<MetricRowItem> = {
    onChange: handleRowSelection,
    selectedRowKeys: selected,
  };

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goNext' });
  }, [dispatchStep]);

  return (
    <StepView
      globalMetrics={globalMetrics}
      portfolioMetrics={portfolioMetrics}
      tabKey={tabKey}
      setTabKey={setTabKey}
      isLoading={globalIsLoading || portfolioIsLoading}
      onFinish={handleNextClick}
      portfolio={portfolio}
      rowSelection={rowSelection}
      stepNumber={state.step}
    />
  );
};
