import React, {FC, useState} from 'react';
import { Col, Form, Input, Row, Checkbox } from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox";
import { CdfiContactEditFormData } from 'types';
import { FormProps } from 'types/form';
import { userFieldsRules } from 'constants/forms';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { required } from 'tools/formRules';
import { PhoneInput } from 'components';

export const CdfiContactEditForm: FC<FormProps<CdfiContactEditFormData>> = ({
  onFinish,
  formId,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const isEditForm = formId === 'CONTACT_EDIT';

  const [checked, getChecked] = useState(
    initialValues?.isActive !== undefined ?
      initialValues?.isActive : !isEditForm
  );

  const onChangeActive = (value: CheckboxChangeEvent) => {
    getChecked(value.target.checked)
    form.setFieldsValue({ isActive: value.target.checked });
  }

  const defaultInitialValues =
    initialValues?.firstName?.length ?
      initialValues :
      {...initialValues,  isActive: true};

  return (
    <Form
      form={form}
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      initialValues={defaultInitialValues}
    >
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
            name="username"
            rules={[required(), ...userFieldsRules.username]}
            label="Username"
          >
            <Input placeholder="Enter Username" disabled={isEditForm}/>
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="email"
            rules={[required(), ...userFieldsRules.email]}
            label="Email"
          >
            <Input placeholder="username@email.com" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
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
        <Col span={GRID_COL_HALF_ROW_SPAN}>
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
          <Form.Item name="uploadReminders" valuePropName="checked">
            <Checkbox>Upload Reminders</Checkbox>
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isPublicContact" valuePropName="checked">
            <Checkbox>Public Contact</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="isActive">
            <Checkbox
              checked={checked}
              onChange={(value): void => onChangeActive(value)}
            >
              Active
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
