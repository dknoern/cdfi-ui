import React, { FC } from 'react';
import { Col, Form, Input, Row, Checkbox } from 'antd';
import { SubscriberContactEditFormData } from 'types';
import { FormProps } from 'types/form';
import { userFieldsRules } from 'constants/forms';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { required } from 'tools/formRules';
import { PhoneInput } from 'components';
import { subscriberStore } from 'store';

export const SubscriberContactEditForm: FC<FormProps<SubscriberContactEditFormData>> = ({
  onFinish,
  formId,
  initialValues,
}) => {

  const isEditForm = formId === 'CONTACT_EDIT';
  const isPaidSubscriber = subscriberStore.subscriberId ? true: false;

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      initialValues={initialValues}
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="username"
            rules={[required(), ...userFieldsRules.username]}
            label="Username"
          >
            <Input placeholder="Enter Username" disabled={isEditForm}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="firstName"
            rules={[required(), ...userFieldsRules.name]}
            label="First Name"
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="lastName"
            rules={[required(), ...userFieldsRules.surname]}
            label="Last Name"
          >
            <Input placeholder="Enter Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="email"
            rules={[required(), ...userFieldsRules.email]}
            label="Email"
          >
            <Input placeholder="username@email.com" />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="title" label="Job Title (Optional)">
            <Input placeholder="Enter Job Title" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="phone"
            label="Phone Number (Optional)"
            rules={[...userFieldsRules.phone]}
          >
            <PhoneInput placeholder="Enter phone" />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN / 3}>
          <Form.Item
            name="phoneExtension"
            label=" "
            rules={[...userFieldsRules.phoneExtension]}
          >
            <Input placeholder="Ext #" size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isActive" valuePropName="checked">
            <Checkbox>Active</Checkbox>
          </Form.Item>
        </Col>
        {isPaidSubscriber && (
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item name="emailReminders" valuePropName="checked">
              <Checkbox>Subscription Reminders</Checkbox>
            </Form.Item>
          </Col>)}
      </Row>
      {isPaidSubscriber && (
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item name="newFinancialReminders" valuePropName="checked">
              <Checkbox>New Financial Reminders</Checkbox>
            </Form.Item>
          </Col>
        </Row>)}
    </Form>
  );
};
