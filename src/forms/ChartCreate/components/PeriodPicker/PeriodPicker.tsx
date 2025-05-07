import React, { FC, useCallback } from 'react';
import { Row, Col, Form, Select, Input, InputNumber } from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { FormSecondaryLabel } from 'components';
import { MetricSharePeriod } from 'types';
import { ReportingPeriod } from 'types/reportedData';
import { minValue, required, maxValue } from 'tools/formRules';
import styles from './PeriodPicker.module.scss';

const frequencies = Object.values(MetricSharePeriod);
const quarters = new Array(4)
  .fill(0)
  .map((item, idx) => ({ label: `Q${idx + 1}`, value: idx + 1 }));

export type PeriodBreakpoint = [
  'periodStart' | 'periodEnd',
  keyof ReportingPeriod,
];

type PeriodPickerProps = {
  onValuesChange: (
    field: PeriodBreakpoint | 'frequency',
  ) => (value: MetricSharePeriod | number) => void;
};

export const PeriodPicker: FC<PeriodPickerProps> = ({ onValuesChange }) => {
  const handleFrequencyChange = useCallback(
    (value: MetricSharePeriod) => {
      onValuesChange('frequency')(value);
    },
    [onValuesChange],
  );

  const handleBreakpointChange = useCallback(
    (field: PeriodBreakpoint) => (value: number): void => {
      onValuesChange(field)(value);
    },
    [onValuesChange],
  );

  return (
    <>
      <Row align="middle" gutter={[GRID_GUTTER, 0]}>
        <Col md={GRID_COL_FULL_ROW_SPAN} xl={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="frequency"
            label={
              <FormSecondaryLabel
                className={styles.smallLabel}
                text="Time Unit"
              />
            }
            className={styles.subItem}
            rules={[required()]}
          >
            <Select
              placeholder="Select Frequency"
              options={frequencies.map((value) => ({
                label: value,
                value,
              }))}
              onSelect={handleFrequencyChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            label={
              <FormSecondaryLabel
                className={styles.smallLabel}
                text="Beginning Period"
              />
            }
          >
            <Input.Group>
              <Form.Item
                name={['periodStart', 'year']}
                noStyle
                rules={[minValue(1900), maxValue(2100)]}
                className={styles.subItem}
              >
                <InputNumber
                  className={styles.yearInput}
                  placeholder="Year"
                  min={1900}
                  max={2100}
                />
              </Form.Item>
              <Form.Item name={['periodStart', 'quarter']} noStyle>
                <Select
                  options={quarters}
                  placeholder="Quarter"
                  className={styles.quarterSelect}
                  onSelect={handleBreakpointChange(['periodStart', 'quarter'])}
                  allowClear
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            label={
              <FormSecondaryLabel
                className={styles.smallLabel}
                text="Ending Period"
              />
            }
          >
            <Input.Group>
              <Form.Item
                name={['periodEnd', 'year']}
                noStyle
                rules={[minValue(1900), maxValue(2100)]}
                className={styles.subItem}
              >
                <InputNumber
                  className={styles.yearInput}
                  placeholder="Year"
                  min={1900}
                  max={2100}
                />
              </Form.Item>
              <Form.Item name={['periodEnd', 'quarter']} noStyle>
                <Select
                  options={quarters}
                  placeholder="Quarter"
                  className={styles.quarterSelect}
                  onSelect={handleBreakpointChange(['periodEnd', 'quarter'])}
                  allowClear
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
