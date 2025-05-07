import React, { FC } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { FormProps, FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import { SelectProps } from 'antd/lib/select';
import { VoidFn, Company } from 'types';
import {
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { generateFormId } from 'tools/formTools';
import { maxLength, minLength, required } from 'tools/formRules';
import { FormPrimaryLabel } from 'components';
import { Tags } from 'forms/shared/Tags';
import { formName } from 'forms/PortfolioSetup/constants';
import { StepData } from './types';
import styles from './StepView.module.scss';

type StepProps = {
  stepIndex: number;
  formInstance: FormInstance<StepData>;
  initialValues: StepData;
  onValuesChange: NonNullable<FormProps<StepData>['onValuesChange']>;
  handleNextClick: VoidFn;
  companyOptions: SelectProps<Company['id']>['options'];
  isLoadingCompanies: boolean;
};

export const StepView: FC<StepProps> = ({
  initialValues,
  companyOptions,
  stepIndex,
  handleNextClick,
  formInstance,
  isLoadingCompanies,
  onValuesChange,
}) => {
  return (
    <Form
      id={generateFormId(formName, stepIndex)}
      form={formInstance}
      size="large"
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      initialValues={initialValues}
      hideRequiredMark
      onFinish={handleNextClick}
      onValuesChange={onValuesChange}
    >
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col lg={GRID_COL_QUARTER_ROW_SPAN} flex="auto">
          <Form.Item
            name="name"
            label={<FormPrimaryLabel num={1} text="Portfolio Name" />}
            rules={[minLength(2), maxLength(), required()]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col lg={GRID_COL_FULL_ROW_SPAN} flex="auto">
          <Form.Item
            name="tags"
            rules={[maxLength(20, 'array')]}
            label={<FormPrimaryLabel num={2} text="Relevant tags (up to 20)" />}
          >
            <Tags selectColSpan={GRID_COL_QUARTER_ROW_SPAN} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col lg={GRID_COL_QUARTER_ROW_SPAN} flex="auto">
          <Form.Item label={<FormPrimaryLabel num={3} text="Investments" />}>
            <Form.Item
              name="investments"
              shouldUpdate={(
                prevValues: Store,
                currentValues: Store,
              ): boolean => prevValues.tags !== currentValues.tags}
            >
              <Select
                mode="multiple"
                options={companyOptions}
                loading={isLoadingCompanies}
                showSearch
                showArrow
                optionFilterProp="label"
                className={styles.select}
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
