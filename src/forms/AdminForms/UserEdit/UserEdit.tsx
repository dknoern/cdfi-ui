import React, { FC } from 'react';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Company, CompanyType, PersonRole, UserEditFormData } from 'types';
import { FormProps } from 'types/form';
import { required } from 'tools/formRules';
import { userFieldsRules } from 'constants/forms';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { FormLabelWithIcon, PhoneInput } from 'components';
import { personRoleNames } from 'constants/roles';
import styles from 'forms/AdminForms/FormTemplate/FormTemplate.module.scss';
import { userStore } from 'store';
import { useAppConfig } from 'useAppConfig';
export const UserEdit: FC<
  FormProps<UserEditFormData> & {
    companyId: Company['id'];
    companyType: Company['type'];
  }
> = ({ onFinish, initialValues, formId, companyId, companyType }) => {
  const { NEW_ROLES_ENABLED } = useAppConfig();
  const availableAerisRoles = NEW_ROLES_ENABLED 
    ? [PersonRole.ADMIN, PersonRole.ANALYST, PersonRole.STAFF, PersonRole.CONTRACTOR]
    : [PersonRole.ADMIN, PersonRole.ANALYST];
  const availableRoles = userStore.isAerisAdmin
    ? availableAerisRoles
    : [];

  const isEditForm = formId === 'userEditForm';

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      hideRequiredMark
      className={styles.form}
      initialValues={initialValues}
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="username"
            rules={[required(), ...userFieldsRules.username]}
            label={
              <FormLabelWithIcon
                description="Type user's username here"
                text="Username"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Input placeholder="Enter username" disabled={isEditForm} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="firstName"
            rules={[required(), ...userFieldsRules.name]}
            label={
              <FormLabelWithIcon
                description="Type user's first name here"
                text="First Name"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="lastName"
            rules={[required(), ...userFieldsRules.surname]}
            label={
              <FormLabelWithIcon
                description="Type user's last name here"
                text="Last Name"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="email"
            rules={[required(), ...userFieldsRules.email]}
            label={
              <FormLabelWithIcon
                description="Type user's email here"
                text="Email"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Input placeholder="Enter email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="phone"
            rules={userFieldsRules.phone}
            label={
              <FormLabelWithIcon
                description="Type user's phone here"
                text="Phone"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <PhoneInput placeholder="Enter phone" />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="phoneExtension"
            rules={userFieldsRules.phoneExtension}
            label={
              <FormLabelWithIcon
                description="Type user's phone extension here"
                text="Extension"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Input placeholder="Ext #" size="large" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="role"
            rules={[required()]}
            label={
              <FormLabelWithIcon
                description="Select person role"
                text="Person Role"
                icon={QuestionCircleOutlined}
              />
            }
          >
            <Select
              options={availableRoles.map((item) => ({
                value: item,
                label: personRoleNames[item],
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      {isEditForm && (
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item name="isActive" valuePropName="checked">
              <Checkbox>Active</Checkbox>
            </Form.Item>
          </Col>
        </Row>
      )}
    </Form>
  );
};
