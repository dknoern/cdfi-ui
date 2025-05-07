import React, { FC, useCallback, useEffect, useContext, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'antd';
import { Company } from 'types';
import { MetricRowItem } from 'types/metricTableItem';
import { typography } from 'constants/typography';
import { FormPrimaryLabel } from 'components';
import { onlyNumericMetrics } from 'tools/filter';
import { generateFormId } from 'tools/formTools';
import { workDataStore } from 'store';
import { formName } from 'forms/ChartCreate/constants';
import { stepContext } from 'forms/ChartCreate/context';
import { activateDispatchData } from 'forms/ChartCreate/tools';
import { withPreviewArea, StepTitle } from 'forms/ChartCreate/components';
import { store as formStore } from 'forms/ChartCreate/store';
import { metricsStore } from 'forms/ChartCreate/metricsStore';
import { MetricsPicker } from './components';
import styles from './SelectMetrics.module.scss';

const { selectMetricsTitle4Company, selectMetricsTitle4Portfolio } = typography(
  'chartsSetup',
);

const SelectMetricsFn: FC = () => {
  const { state, dispatch } = useContext(stepContext);
  const { isCompanyViewMode } = workDataStore;
  const { pcIds } = formStore.data;

  const [form] = Form.useForm();

  const afterMetricsLoaded = useCallback((metrics) => {
    metricsStore.setMetrics(metrics);
  }, []);

  const handleMetricsChange = useCallback<
    (value: MetricRowItem['id'][]) => void
  >(
    (metrics) => {
      formStore.updateMetrics(metrics);

      form.setFieldsValue({ metrics });
    },
    [form],
  );

  const isEdit = !!formStore.data.id;
  useEffect(() => {
    dispatch(activateDispatchData(2, isEdit));
  }, [dispatch, isEdit]);

  const showMetricPicker = useMemo(() => {
    return pcIds.length > 0 || isCompanyViewMode;
  }, [pcIds.length, isCompanyViewMode]);

  const handleNextClick = useCallback(() => {
    dispatch({ type: 'goNext' });
  }, [dispatch]);

  return (
    <Form
      form={form}
      id={generateFormId(formName, state.step)}
      layout="vertical"
      className={styles.form}
      initialValues={{
        portfolioCompanies: pcIds,
        metrics: metricsStore.metrics,
      }}
      onFinish={handleNextClick}
      hideRequiredMark
    >
      <StepTitle
        title={
          isCompanyViewMode
            ? selectMetricsTitle4Company
            : selectMetricsTitle4Portfolio
        }
        description={
          pcIds.length < 1 ? 'First, you need to select Investments' : null
        }
      />
      {showMetricPicker && (
        <>
          <Form.Item
            label={
              <FormPrimaryLabel
                text={`${
                  isCompanyViewMode
                    ? 'The metrics below are reported by this Investment'
                    : 'The metrics below are reported by all of the selected Investments'
                }`}
              />
            }
          >
            <MetricsPicker
              selectedMetricIds={formStore.data.metrics.map((item) => item.id)}
              companyIds={
                isCompanyViewMode
                  ? [workDataStore.viewModeConfig.companyId as Company['id']]
                  : formStore.data.pcIds
              }
              onChange={handleMetricsChange}
              onMetricsLoaded={afterMetricsLoaded}
              filterFn={onlyNumericMetrics}
            />
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export const SelectMetrics = withPreviewArea(observer(SelectMetricsFn));
