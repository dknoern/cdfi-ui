import React, { FC, useEffect, useContext, useCallback } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { GraphType } from 'types/graphs';
import { FormPrimaryLabel } from 'components';
import { activateDispatchData } from 'forms/ChartCreate/tools';
import { store as formStore } from 'forms/ChartCreate/store';
import { stepContext } from '../../context';
import { withPreviewArea, StepTitle } from '../../components';
import { AxesNGrids, Legend, ChartTypeSelector } from './components';
import styles from './FormatChart.module.scss';

const FormatChartFn: FC = () => {
  const { data } = formStore;
  const { type, formatChart } = toJS(data);
  const { dispatch } = useContext(stepContext);

  const handleValuesChange = useCallback((_: Store, all: Store) => {
    formStore.parseData('type', all.type);
    if (all.formatChart) formStore.parseData('formatChart', all.formatChart);
  }, []);

  const isEdit = !!formStore.data.id;
  useEffect(() => {
    dispatch(activateDispatchData(5, isEdit));
  }, [dispatch, isEdit]);

  return (
    <Form
      layout="vertical"
      size="middle"
      initialValues={{ type, formatChart }}
      onValuesChange={handleValuesChange}
      className={styles.form}
    >
      <StepTitle title="Add & Format a Chart for the New Table" />
      <Form.Item
        name="type"
        label={<FormPrimaryLabel num={1} text="Select Chart Type" />}
      >
        <ChartTypeSelector />
      </Form.Item>
      {type && type === GraphType.PIE && (
        <Form.Item label={<FormPrimaryLabel num={2} text="Legend" />}>
          <Legend />
        </Form.Item>
      )}
      {type && type !== GraphType.TABLE && type !== GraphType.PIE && (
        <>
          <Form.Item
            name="formatChart"
            label={<FormPrimaryLabel num={2} text="Format Chart" />}
          >
            <AxesNGrids />
          </Form.Item>
          <Form.Item label={<FormPrimaryLabel num={3} text="Legend" />}>
            <Legend />
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export const FormatChart = withPreviewArea(observer(FormatChartFn));
