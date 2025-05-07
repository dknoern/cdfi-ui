import React, { FC, useCallback, useContext, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Form, Radio, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { useGraphsFor } from 'dataManagement';
import { workDataStore } from 'store';
import { generateFormId } from 'tools/formTools';
import { formRuleMessages } from 'tools/formRules';
import { formName } from 'forms/ChartCreate/constants';
import { store as formStore } from 'forms/ChartCreate/store';
import { convertConfig } from './tools';
import { stepContext } from '../../context';
import { StepTitle } from '../../components';
import styles from './SelectTemplate.module.scss';

enum OPTIONS {
  NEW = 'NEW',
  TEMPLATE = 'TEMPLATE',
}

const SelectTemplateFn: FC = () => {
  const { state, dispatch } = useContext(stepContext);
  const { data: charts, isLoading: isChartsLoading } = useGraphsFor(
    convertConfig(workDataStore.viewModeConfig),
  );
  const [form] = Form.useForm();

  const handleValuesChange = useCallback((changed: Store, allValues: Store) => {
    formStore.setTemplateId(
      allValues.option === OPTIONS.NEW
        ? undefined
        : (allValues.templateId as number),
    );
  }, []);

  useEffect(() => {
    dispatch({ step: 0, type: 'available' });
  }, [dispatch]);

  const handleNextClick = useCallback(() => {
    dispatch({ type: 'goToStep', step: state.step + 1 });
  }, [dispatch, state.step]);

  const options = useMemo(
    () =>
      (charts ?? []).map((item) => ({
        label: item.title,
        value: item.id,
      })),
    [charts],
  );

  return (
    <Form
      id={generateFormId(formName, state.step)}
      form={form}
      labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
      size="large"
      initialValues={{
        option: formStore.templateId ? OPTIONS.TEMPLATE : OPTIONS.NEW,
        templateId: formStore.templateId ?? undefined,
      }}
      onValuesChange={handleValuesChange}
      onFinish={handleNextClick}
    >
      <StepTitle title="Select from existing data table/chart templates or create a new data table/chart " />
      <Form.Item name="option" className={styles.formItem}>
        <Radio.Group
          onChange={(e): void => {
            if (e.target.value === OPTIONS.NEW) {
              form.setFieldsValue({ templateId: undefined });
            }

            form.validateFields(['templateId']).catch((error) => {
              // see validation messages
            });
          }}
        >
          <Radio checked value={OPTIONS.NEW} className={styles.radio}>
            Create new Data Table / Chart
          </Radio>
          <Radio value={OPTIONS.TEMPLATE} className={styles.radio}>
            Use existing template
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        dependencies={['option']}
        noStyle
        rules={[
          {
            validator: (): Promise<void> => {
              if (
                form.getFieldValue(['option']) === OPTIONS.TEMPLATE &&
                !form.getFieldValue(['templateId'])
              ) {
                return Promise.reject(formRuleMessages().required);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        {(formItem) => (
          <Form.Item
            name="templateId"
            className={`${styles.formItem} ${styles.selectItem}`}
          >
            <Select
              options={options}
              loading={isChartsLoading}
              disabled={formItem.getFieldValue(['option']) === OPTIONS.NEW}
              placeholder="Select Template"
            />
          </Form.Item>
        )}
      </Form.Item>
    </Form>
  );
};
export const SelectTemplate = observer(SelectTemplateFn);
