import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/lib/table/interface';
import { typography } from 'constants/typography';
import { Metric } from 'types';
import { MetricRowItem } from 'types/metricTableItem';
import { MetricsTable, EditMetricsLine, FrequencyPopover } from 'components';
import { stepContext } from 'forms/PortfolioSetup/context';
import { formName } from 'forms/PortfolioSetup/constants';
import { formStore } from 'forms/PortfolioSetup/formStore';
import { generateFormId } from 'tools/formTools';
import { StepTitle, StepIntro } from '../../components';
import { columnList } from './constants';
import { AddMetric } from './AddMetric';
import { updateMetrics } from './tools';
import styles from './CustomizeMetrics.module.scss';

const { metricCustomTitle, metricCustomDescr } = typography(
  'portfolioCreation',
);

const CustomizeMetricsFn: FC = () => {
  const [addMetricFormShow, setAddMetricFormShow] = useState(false);
  const [selected, setSelected] = useState<React.Key[]>([]);

  const { state, dispatch: dispatchStep } = useContext(stepContext);

  useEffect(() => {
    dispatchStep({ type: 'available', step: 2 });
  }, [dispatchStep]);

  const rowSelection: TableRowSelection<MetricRowItem> = {
    onChange: setSelected,
    selectedRowKeys: selected,
  };

  const updateMetricData = useCallback(
    (data) => {
      updateMetrics(selected as Metric['id'][], data);
    },
    [selected],
  );

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goNext' });
  }, [dispatchStep]);

  return (
    <Form id={generateFormId(formName, state.step)} onFinish={handleNextClick}>
      <Button
        id="createMetricButton"
        type="default"
        size="middle"
        icon={<PlusOutlined className={styles.buttonIcon} />}
        onClick={(): void => {
          setAddMetricFormShow(true);
        }}
        className={styles.addMetricButton}
      >
        Create New Metric
      </Button>
      <StepTitle>{metricCustomTitle}</StepTitle>
      <StepIntro>{metricCustomDescr}</StepIntro>
      <EditMetricsLine selectedMetricIds={selected as Metric['id'][]}>
        <FrequencyPopover
          selectedMetricIds={selected as Metric['id'][]}
          setParam={updateMetricData}
        />
      </EditMetricsLine>
      <MetricsTable
        id="customizeMetricsTable"
        layout="fixed"
        dataSource={formStore.selectedMetrics ?? []}
        rowSelection={rowSelection}
        columnNamesList={columnList}
        scroll={{ y: 600 }}
      />
      <AddMetric
        onCancel={(): void => {
          setAddMetricFormShow(false);
        }}
        onFinish={(): void => {
          setAddMetricFormShow(false);
        }}
        visible={addMetricFormShow}
      />
    </Form>
  );
};

export const CustomizeMetrics = observer(CustomizeMetricsFn);
