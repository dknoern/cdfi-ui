import React, { FC } from 'react';
import { Form, Row, Col, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { SubscriptionType } from 'types';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { FormLabelWithIcon, DatePicker } from 'components';
import { maxLength, minLength, required } from 'tools/formRules';

const typeOptions = Object.values(SubscriptionType).map((value) => ({
  label: value,
  value,
}));

export const General: FC = () => {
  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="type"
            label={
              <FormLabelWithIcon
                description="Choose the subscription type of Aeris Client company"
                text="Type"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Select
              placeholder="Select subscription type"
              options={typeOptions}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="startDate"
            rules={[required(), minLength(10), maxLength(10)]}
            label={
              <FormLabelWithIcon
                description="Type here subscription start date"
                text="Start Date"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="endDate"
            rules={[required(), minLength(10), maxLength(10)]}
            label={
              <FormLabelWithIcon
                description="Type here subscription end date"
                text="End Date"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
