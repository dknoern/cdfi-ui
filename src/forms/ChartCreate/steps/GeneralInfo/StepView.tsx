import React, { FC, useCallback } from 'react';
import { Row, Col, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import { MetricSharePeriod } from 'types';
import { typography } from 'constants/typography';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
} from 'constants/ui';
import { MAX_LENGTH_TEXTAREA } from 'constants/validation';
import { generateFormId } from 'tools/formTools';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import { FormPrimaryLabel } from 'components';
import {
  StepTitle,
  PeriodPicker,
  PeriodBreakpoint,
} from 'forms/ChartCreate/components';
import { StepViewProps as StepViewPropsBase } from 'forms/types';
import { formName } from 'forms/ChartCreate/constants';
import { workDataStore } from 'store';
import { store } from '../../store';
import { CompanyPicker } from './components';
import styles from './GeneralInfo.module.scss';

const { generalInfoTitleCreate, generalInfoTitleEdit } = typography(
  'chartsSetup',
);

type StepViewProps = StepViewPropsBase & { isEdit: boolean };

const StepViewFn: FC<StepViewProps> = ({
  initialValues,
  onValuesChange,
  handleNextClick,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const { portfolio, isCompanyViewMode } = workDataStore;

  const handlePeriodChange = useCallback(
    (field: PeriodBreakpoint | 'frequency') => (
      value: MetricSharePeriod | number,
    ): void => {
      if (field === 'frequency') {
        store.parseData(field, value as MetricSharePeriod);
        return;
      }

      const [fieldName, propName] = field;
      store.parseDataPart(fieldName, {
        ...(store.data[fieldName] ?? {}),
        [propName]: value,
      });
    },
    [],
  );

  return (
    <Form
      id={generateFormId(formName, isEdit ? 0 : 1)}
      form={form}
      labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
      size="large"
      onValuesChange={onValuesChange}
      initialValues={initialValues}
      onFinish={handleNextClick}
      hideRequiredMark
    >
      <StepTitle
        title={isEdit ? generalInfoTitleEdit : generalInfoTitleCreate}
        className={styles.pageHeader}
      />
      <Row gutter={[0, 0]}>
        <Col
          xl={GRID_COL_FULL_ROW_SPAN - GRID_COL_QUARTER_ROW_SPAN}
          xxl={GRID_COL_HALF_ROW_SPAN}
        >
          <Form.Item
            name="name"
            label={
              <FormPrimaryLabel
                num={1}
                text="Enter name of data table / chart"
              />
            }
            rules={[required(), maxLength(), minLength(), restrictWhitespace()]}
          >
            <Input type="text" placeholder="Enter Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[0, 0]}>
        <Col
          xl={GRID_COL_FULL_ROW_SPAN - GRID_COL_QUARTER_ROW_SPAN}
          xxl={GRID_COL_HALF_ROW_SPAN}
        >
          <Form.Item
            name="description"
            label={
              <FormPrimaryLabel
                num={2}
                text="Enter description"
                hint="Optional"
              />
            }
            rules={[maxLength(MAX_LENGTH_TEXTAREA), restrictWhitespace()]}
          >
            <Input.TextArea rows={3} placeholder="Enter a brief description" />
          </Form.Item>
        </Col>
      </Row>
      <FormPrimaryLabel num={3} text="Time period to include" />
      <PeriodPicker onValuesChange={handlePeriodChange} />
      {!isCompanyViewMode && (
        <Row gutter={[0, GRID_GUTTER / 2]}>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item
              label={<FormPrimaryLabel num={4} text="Investments (min. 2)" />}
              name="pcIds"
              rules={[required('array'), minLength(2, 'array')]}
            >
              <CompanyPicker options={portfolio?.investments} />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export const StepView = observer(StepViewFn);
