import React, { FC } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';
import { FormLabelWithIcon } from 'components';
import { monthIndexToName } from 'tools';
import { required } from 'tools/formRules';

export const General: FC = () => {
  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="name"
            rules={[required()]}
            label={
              <FormLabelWithIcon
                description="Type here the name for Aeris Client company"
                text="Name"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Input placeholder="Enter name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="fiscalYearEnd"
            rules={[required('string')]}
            label={
              <FormLabelWithIcon
                description="Type here the fiscal year end of Aeris Client company"
                text="Fiscal Year End"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Select placeholder="Select Year End">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthNum) => (
                <Select.Option key={monthNum} value={String(monthNum)}>
                  {monthIndexToName(monthNum - 1)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="description"
            label={
              <FormLabelWithIcon
                description="Type here the description for Aeris Client company"
                text="Description"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
