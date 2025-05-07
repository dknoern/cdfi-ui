import React, { FC } from 'react';
import { Form, Row, Col, Select } from 'antd';
import { InvestmentType } from 'types';
import {
  GRID_GUTTER,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';
import { ZERO_VALUE } from 'constants/validation';
import { typography } from 'constants/typography';
import { months } from 'constants/months';
import { investmentTypeNames } from 'constants/investmentTypes';
import { FormPrimaryLabel, DatePicker, FormattedNumberInput } from 'components';
import { monthIndexToName } from 'tools';
import { required, minValue, maxTotalInvestment } from 'tools/formRules';
import styles from '../CompanyInfoForm.module.scss';

const { reportingPeriodStartHint } = typography('portfolioCompanyCreation');

const investmentTypesList = (Object.keys(investmentTypeNames) as Array<
  InvestmentType
>).map((key) => ({
  value: key,
  label: investmentTypeNames[key],
}));

export const InvestmentsGroup: FC = () => {
  return (
    <Row gutter={[GRID_GUTTER, 0]}>
      <Col lg={GRID_COL_QUARTER_ROW_SPAN}>
        <Form.Item
          label={
            <FormPrimaryLabel num={5} text="Investment Type" hint="Optional" />
          }
        >
          <Form.Item noStyle name="investmentType">
            <Select options={investmentTypesList} />
          </Form.Item>
        </Form.Item>
      </Col>
      <Col lg={GRID_COL_QUARTER_ROW_SPAN}>
        <Form.Item
          name="investment"
          label={<FormPrimaryLabel num={6} text="Total Commitment " />}
          rules={[
            required('number'),
            minValue(ZERO_VALUE),
            maxTotalInvestment(),
          ]}
        >
          <FormattedNumberInput className={styles.totalInvestmentInput} />
        </Form.Item>
      </Col>
      <Col lg={GRID_COL_HALF_ROW_SPAN}>
        <Form.Item
          label={
            <FormPrimaryLabel num={7} text="Investment Life" hint="Optional" />
          }
        >
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={10}>
              <Form.Item name={['investmentLife', 'start']}>
                <DatePicker placeholder="Select Start Date" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name={['investmentLife', 'maturity']}>
                <DatePicker placeholder="Select Maturity Date" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Col>
      <Col lg={5}>
        <Form.Item
          name="fiscalYearEnd"
          label={<FormPrimaryLabel num={8} text="Fiscal Year End" />}
          rules={[required('number')]}
        >
          <Select placeholder="Select Year End">
            {months.map((month, idx) => (
              <Select.Option key={month} value={idx + 1}>
                {monthIndexToName(idx)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col offset={1} lg={GRID_COL_QUARTER_ROW_SPAN}>
        <Form.Item
          label={
            <FormPrimaryLabel num={9} text="Reporting Period Start Date" />
          }
          name="reportingStartDate"
          rules={[required()]}
          extra={reportingPeriodStartHint}
        >
          <DatePicker placeholder="Select Reporting Period Start Date" />
        </Form.Item>
      </Col>
    </Row>
  );
};
