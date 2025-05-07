import React, { FC, useState, useContext, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Form, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/lib/table/interface';
import { typography } from 'constants/typography';
import { Metric } from 'types';
import { MetricRowItem } from 'types/metricTableItem';
import {
  MetricsTable,
  EditMetricsLine,
  CategoryPopover,
  TagsPopover,
  FrequencyPopover,
} from 'components';
import { formStore } from 'forms/PCCreate/formStore';
import { stepContext } from 'forms/PCCreate/context';
import { stepIndexByKey } from 'forms/PCCreate/tools';
import { AddMetric } from 'forms/PCCreate/components';
import { formName } from 'forms/PCCreate/constants';
import { generateFormId } from 'tools/formTools';
import { FormStep } from 'forms/PCCreate/types';
import { FormResult } from './types';
import { CURRENT_STEP, columnList } from './constants';
import { updateMetrics } from './tools';
import styles from './CustomizeMetrics.module.scss';

const { Paragraph, Title } = Typography;

const { metricCustomTitle, metricCustomDescr } = typography(
  'portfolioCompanyCreation',
);

const CustomizeMetricsFn: FC = () => {
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [addMetricFormShow, setAddMetricFormShow] = useState(false);

  // set next button available
  const { state, dispatch: dispatchStep } = useContext(stepContext);
  useEffect(() => {
    dispatchStep({
      type: 'available',
      step: stepIndexByKey(FormStep.customizeMetrics),
    });
  }, [dispatchStep]);

  const rowSelection: TableRowSelection<MetricRowItem> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys);
    },
    selectedRowKeys: selected,
  };

  const reduceData = useCallback(
    (setData) => {
      updateMetrics(selected as number[], setData);
    },
    [selected],
  );

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goToStep', step: state.step + 1 });
  }, [dispatchStep, state.step]);

  return (
    <>
      <Form
        size="large"
        labelCol={{ span: 24 }}
        id={generateFormId(formName, state.step)}
        onFinish={handleNextClick}
      >
        <Button
          id="createMetricButton"
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          ghost
          onClick={(): void => {
            setAddMetricFormShow(true);
          }}
          className={styles.addMetricBtn}
        >
          Create New Metric
        </Button>
        <Title level={2} className={styles.pageTitle}>
          {metricCustomTitle}
        </Title>
        <Paragraph type="secondary" className={styles.pageIntro}>
          {metricCustomDescr}
        </Paragraph>
        <EditMetricsLine selectedMetricIds={selected as Metric['id'][]}>
          <CategoryPopover
            selectedMetricIds={selected as Metric['id'][]}
            setParam={reduceData}
          />
          <TagsPopover
            selectedMetricIds={selected as Metric['id'][]}
            setParam={reduceData}
            metrics={formStore.data[CURRENT_STEP] as FormResult}
          />
          <FrequencyPopover
            selectedMetricIds={selected as Metric['id'][]}
            setParam={reduceData}
          />
        </EditMetricsLine>
        <MetricsTable
          id="customizeMetricsTable"
          layout="fixed"
          dataSource={
            formStore.data[CURRENT_STEP]
              ? (formStore.data[CURRENT_STEP] as MetricRowItem[])
              : []
          }
          rowSelection={rowSelection}
          columnNamesList={columnList}
        />
      </Form>
      <AddMetric
        onCancel={(): void => {
          setAddMetricFormShow(false);
        }}
        visible={addMetricFormShow}
      />
    </>
  );
};

export const CustomizeMetrics = observer(CustomizeMetricsFn);
