import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Form } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { Metric } from 'types';
import { MetricRowItem } from 'types/metricTableItem';
import { typography } from 'constants/typography';
import { MetricsTable } from 'components';
import { stepContext } from 'forms/PortfolioSetup/context';
import { formStore } from 'forms/PortfolioSetup/formStore';
import { formName } from 'forms/PortfolioSetup/constants';
import { generateFormId } from 'tools/formTools';
import { useGlobalMetrics } from 'dataManagement';
import { StepTitle, StepIntro } from '../../components';
import { columnList, columnWidth } from './constants';
import { formatSelectedMetrics } from './tools';

const {
  globalMetricAssignTitle,
  metricAssignDescription,
  companyMetricAssignTitle,
} = typography('portfolioCreation');

export const AssignMetrics: FC = () => {
  const [selected, setSelected] = useState<React.Key[]>([]);
  const { state, dispatch: dispatchStep } = useContext(stepContext);
  const { data: metrics, isLoading } = useGlobalMetrics();

  const availableMetrics = useMemo(() => metrics ?? [], [metrics]);

  useEffect(() => {
    if (formStore.selectedMetrics && formStore.selectedMetrics.length > 0) {
      setSelected(formStore.selectedMetrics.map((metric) => metric.id));
    }
  }, []);

  useEffect(() => {
    dispatchStep({ type: 'available', step: 1 });
  }, [dispatchStep]);

  const rowSelection: TableRowSelection<MetricRowItem> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys);
      formStore.updateData({
        assignedMetrics: formatSelectedMetrics(
          selectedRowKeys as Metric['id'][],
          availableMetrics,
        ),
      });
    },
    selectedRowKeys: selected,
  };

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goNext' });
  }, [dispatchStep]);

  return (
    <Form id={generateFormId(formName, state.step)} onFinish={handleNextClick}>
      <StepTitle>
        {formStore.investments.length > 0
          ? companyMetricAssignTitle
          : globalMetricAssignTitle}
      </StepTitle>
      <StepIntro>{metricAssignDescription}</StepIntro>
      <MetricsTable
        id="MetricsTable"
        dataSource={availableMetrics}
        rowSelection={rowSelection}
        isLoading={isLoading}
        columnNamesList={columnList}
        scroll={{ y: 600 }}
        layout="fixed"
        columnWidth={columnWidth}
      />
    </Form>
  );
};
