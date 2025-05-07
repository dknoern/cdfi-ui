import React, { FC } from 'react';
import { Form, Row, Col, InputNumber } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { metricValueRules } from 'constants/forms';
import { FormLabelWithIcon } from 'components';
import { inputNumberParser } from 'tools';
import { required } from 'tools/formRules';
import { ValueFieldProps } from '../types';
import styles from '../DataInputForms.module.scss';

export const Numeric: FC<ValueFieldProps> = ({ nameField }) => {
  return (
    <Row gutter={[GRID_GUTTER, 0]}>
      <Col span={GRID_COL_FULL_ROW_SPAN / 2}>{nameField}</Col>
      <Col span={GRID_COL_FULL_ROW_SPAN / 2}>
        <Form.Item
          label={
            <FormLabelWithIcon
              description="Type here new metric value."
              text="New value"
              icon={QuestionCircleOutlined}
            />
          }
          name="value"
          rules={[required('number'), ...metricValueRules.NUMERIC]}
          validateFirst
        >
          <InputNumber
            placeholder="Create new value"
            decimalSeparator="."
            parser={inputNumberParser}
            className={styles.numberInput}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
