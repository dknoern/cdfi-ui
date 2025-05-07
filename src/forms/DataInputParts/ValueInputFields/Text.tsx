import React, { FC } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { metricValueRules } from 'constants/forms';
import { FormLabelWithIcon } from 'components';
import { required } from 'tools/formRules';
import { ValueFieldProps } from '../types';
import styles from '../DataInputForms.module.scss';

export const Text: FC<ValueFieldProps> = ({ metric, nameField }) => {
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
                description="Type here new metric value."
                text="New value"
                icon={QuestionCircleOutlined}
              />
            }
            name="value"
            rules={[required(), ...metricValueRules.TEXT]}
          >
            <Input placeholder="Create new value" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
