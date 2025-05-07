import React, { FC } from 'react';
import { Form, Row, Col, Input, Select } from 'antd';
import { MetricType, MetricNumericFormat } from 'types';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { metricNumericFormatNames } from 'constants/metricNumericFormat';
import { FormSecondaryLabel } from 'components';
import { minLength, maxLength, required } from 'tools/formRules';
import { MIN_LENGTH_TEXT, MAX_LENGTH_TEXT } from 'constants/validation';
import { decimals } from '../constants';

const { Option } = Select;
const { TextArea } = Input;

type TypeConfigurerProps = {
  type: MetricType;
};
export const TypeConfigurer: FC<TypeConfigurerProps> = ({ type }) => {
  switch (type) {
    case MetricType.NUMERIC:
      return (
        <Row gutter={GRID_GUTTER}>
          <Col sm={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name={['typeConfig', 'format']}
              label={<FormSecondaryLabel text="Format for Table Values" />}
              dependencies={['type']}
            >
              <Select>
                {Object.keys(MetricNumericFormat).map((key) => (
                  <Option key={key} value={key}>
                    {metricNumericFormatNames[key as MetricNumericFormat]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              name={['typeConfig', 'decimals']}
              label={<FormSecondaryLabel text="Decimal places" />}
              dependencies={['type']}
            >
              <Select>
                {decimals.map((title, index) => (
                  <Option key={title} value={index}>
                    {title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      );
    case MetricType.TEXT:
      return (
        <Form.Item
          name={['typeConfig', 'question']}
          label={<FormSecondaryLabel text="Question or Description" />}
          dependencies={['type']}
          rules={[
            required(),
            minLength(MIN_LENGTH_TEXT),
            maxLength(MAX_LENGTH_TEXT),
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>
      );
    default:
      return null;
  }
};
