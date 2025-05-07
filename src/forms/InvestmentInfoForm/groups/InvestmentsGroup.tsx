import React, { FC } from 'react';
import { Form, Row, Col, Select } from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { typography } from 'constants/typography';
import { months } from 'constants/months';
import { FormPrimaryLabel, DatePicker, FormattedNumberInput } from 'components';
import { monthIndexToName } from 'tools';
import { investmentTypesList, fieldRules } from './constants';
import styles from '../formStyles.module.scss';

const { reportingPeriodStartHint } = typography('portfolioCompanyCreation');

export const InvestmentsGroup: FC = () => {
  return (
    <Row gutter={[GRID_GUTTER, 0]}>
      <Col lg={GRID_COL_QUARTER_ROW_SPAN}>
        <Form.Item
          label={
            <FormPrimaryLabel num={5} text="Investment Type" hint="Optional" />
          }
          labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
        >
          <Form.Item noStyle name="investmentType">
            <Select options={investmentTypesList} />
          </Form.Item>
        </Form.Item>
      </Col>
      <Col lg={GRID_COL_QUARTER_ROW_SPAN}>
        <Form.Item
          name="totalCommitment"
          label={<FormPrimaryLabel num={6} text="Total Commitment" />}
          labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
          rules={fieldRules.totalCommitment}
        >
          <FormattedNumberInput className={styles.totalInvestmentInput} />
        </Form.Item>
      </Col>
      <Col lg={GRID_COL_HALF_ROW_SPAN}>
        <Form.Item
          label={
            <FormPrimaryLabel num={7} text="Investment Life" hint="Optional" />
          }
          labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
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
      <Col lg={GRID_COL_QUARTER_ROW_SPAN}>
        <Form.Item
          name="fiscalYearEnd"
          label={<FormPrimaryLabel num={8} text="Fiscal Year End" />}
          labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
          rules={fieldRules.fiscalYearEnd}
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
      <Col lg={GRID_COL_QUARTER_ROW_SPAN}>
        <Form.Item
          name="reportingStartDate"
          label={
            <FormPrimaryLabel num={9} text="Reporting Period Start Date" />
          }
          labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
          rules={fieldRules.reportingStartDate}
          extra={reportingPeriodStartHint}
        >
          <DatePicker placeholder="Select Reporting Period Start Date" />
        </Form.Item>
      </Col>
    </Row>
  );
};
