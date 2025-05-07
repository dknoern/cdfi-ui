import React, { FC } from 'react';
import { Form, Row, Col, Radio } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { MetricMultipleOptionValues } from 'types/metricValue';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { metricValueRules } from 'constants/forms';
import { required } from 'tools/formRules';
import { FormLabelWithIcon } from 'components';
import { ValueFieldProps } from '../types';
import styles from '../DataInputForms.module.scss';

type RadioButtonValue = {
  name: string;
  value: string;
};

export const Multiple: FC<
  ValueFieldProps & { options: MetricMultipleOptionValues[] }
> = ({ metric, nameField, options }) => {
  const radioButtons = (options as MetricMultipleOptionValues[]).map(
    (item: RadioButtonValue) => (
      <Radio value={item.value} key={item.value}>
        {item.name}
      </Radio>
    ),
  );
  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>{nameField}</Col>
      </Row>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <h5 className={styles.formLabel}>Question:</h5>
          <div>{metric.typeConfig.question}</div>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            label={
              <FormLabelWithIcon
                description="Choose new metric value."
                text="New value"
                icon={QuestionCircleOutlined}
              />
            }
            name="value"
          >
            <Radio.Group>{radioButtons}</Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
