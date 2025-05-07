import React, { FC, useMemo } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { MetricType } from 'types';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { FormLabelWithIcon } from 'components';
import {
  required,
  maxLength,
  minLength,
  restrictWhitespace,
} from 'tools/formRules';
import { UpdateValueFormProps } from './types';
import { ChangesHistory } from './ChangesHistory';
import { Date, Numeric, Text, Multiple } from './ValueInputFields';
import styles from './DataInputForms.module.scss';

export const ChangeValueForm: FC<UpdateValueFormProps> = ({
  metric,
  onFinish,
  formId,
  changesHistory,
}) => {
  const ValueField = useMemo(() => {
    switch (metric.typeConfig.type) {
      case MetricType.BOTH:
        return Multiple;
      case MetricType.NUMERIC:
        return Numeric;
      case MetricType.TEXT:
      default:
        return Text;
    }
  }, [metric]);

  const nameField = useMemo(
    () => (
      <Form.Item
        label={
          <FormLabelWithIcon
            description="This field is used to show the current metric name."
            text="Metric name"
            icon={QuestionCircleOutlined}
          />
        }
      >
        <Input value={metric.name} readOnly />
      </Form.Item>
    ),
    [metric.name],
  );

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      className={styles.form}
      hideRequiredMark
    >
      <ValueField metric={metric} nameField={nameField} options={[]} />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            label={
              <FormLabelWithIcon
                description="Type here the reason for change the current metric value."
                text="Reason for change"
                icon={QuestionCircleOutlined}
              />
            }
            name="reason"
            rules={[required(), maxLength(), minLength(), restrictWhitespace()]}
          >
            <Input.TextArea placeholder="Enter reason" rows={3} />
          </Form.Item>
        </Col>
      </Row>
      {changesHistory && changesHistory.length > 0 && (
        <ChangesHistory changesHistory={changesHistory} />
      )}
    </Form>
  );
};
