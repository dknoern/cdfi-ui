import React, { FC } from 'react';
import { Form, Row, Col, Input, Typography } from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
} from 'constants/ui';
import { userFieldsRules } from 'constants/forms';
import { FormPrimaryLabel } from 'components';
import { required } from 'tools/formRules';
import { PhoneInput } from 'components/PhoneInput';
import { AdditionalContacts } from './AdditionalContacts';

const SCOPE = 'primaryContact';

export const ContactGroup: FC = () => {
  return (
    <>
      <Typography.Title level={5}>Contact Information</Typography.Title>
      <Form.Item label={<FormPrimaryLabel num={4} text="Primary contact" />}>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Form.Item
              name={[SCOPE, 'name']}
              rules={[required(), ...userFieldsRules.name]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Form.Item
              name={[SCOPE, 'surname']}
              rules={[required(), ...userFieldsRules.surname]}
            >
              <Input placeholder="Surname" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name={[SCOPE, 'title']}
              rules={[required(), ...userFieldsRules.title]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
          <Col span={7}>&nbsp;</Col>
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Form.Item
              name={[SCOPE, 'phone']}
              rules={[required(), ...userFieldsRules.phone]}
            >
              <PhoneInput />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Form.Item
              name={[SCOPE, 'email']}
              rules={[required(), ...userFieldsRules.email]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Row>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <AdditionalContacts />
        </Col>
      </Row>
    </>
  );
};
