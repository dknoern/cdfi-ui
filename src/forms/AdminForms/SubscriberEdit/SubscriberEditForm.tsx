import React, { FC, useState } from 'react';
import { Checkbox, Col, Form, Input, Row, Select, Button, Divider } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { VoidFn, Subscriber } from 'types';
import { required, minLength } from 'tools/formRules';
import { cdfiFieldsRules } from 'constants/forms';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_GUTTER,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { FormLabelWithIcon, PhoneInput } from 'components';
import { FormInstance } from 'antd/es/form';
import { SubscriberContacts } from 'forms/shared/Contacts';
import styles from './SubscriberForm.module.scss';
import { EditableSubscriber } from './types';
import { states } from './constants';
import { CancelConfirmModal } from '../../../modals';

type SubscriberEditProps = {
  form: FormInstance;
  onFinish: VoidFn;
  onCancel: VoidFn;
  isEditForm: boolean;
  initialValues: (EditableSubscriber & { id?: Subscriber['id'] }) | undefined;
};

export const SubscriberEditForm: FC<SubscriberEditProps> = ({
  onFinish,
  form,
  onCancel,
  isEditForm,
  initialValues,
}) => {
  let sectionNumberCounter = 1;

  const [isCancelCreateSubscriber, setIsCancelCreateSubscriber] =
    useState(false);

  return (
    <Row>
      <Col span={GRID_COL_HALF_ROW_SPAN}>
        <Form
          id="SubscriberEdit"
          onFinish={onFinish}
          layout="vertical"
          hideRequiredMark
          className={styles.form}
          form={form}
          initialValues={initialValues}
        >
          <h1>{sectionNumberCounter++}. Organization Setup</h1>
          <br />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name="name"
                rules={[required()]}
                label={
                  <FormLabelWithIcon
                    description="Type the organization's name here"
                    text="Organization Name"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <Input placeholder="Enter organization name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name="address"
                label={
                  <FormLabelWithIcon
                    description="Type address here"
                    text="Address"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item name="address2" label="Optional">
                <Input placeholder="Suite #, Floor, etc." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item name="city">
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="state">
                <Select
                  placeholder="State"
                  options={states.map((state) => ({
                    value: state.code,
                    label: state.name,
                  }))}
                ></Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="zip">
                <Input placeholder="Zip Code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="phone"
                rules={cdfiFieldsRules.phone}
                label={
                  <FormLabelWithIcon
                    description="Type user's phone here"
                    text="Phone Number"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <PhoneInput placeholder="Enter phone" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN / 3}>
              <Form.Item
                name="phoneExtension"
                label="Extension"
                rules={cdfiFieldsRules.phoneExtension}
              >
                <Input placeholder="Ext #" size="large" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item
                name="fax"
                rules={cdfiFieldsRules.phone}
                label={
                  <FormLabelWithIcon
                    description="Type user's fax # here"
                    text="Fax Number"
                    icon={QuestionCircleOutlined}
                  />
                }
              >
                <PhoneInput placeholder="Enter fax" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item name="website" label="Corporate Site URL">
                <Input placeholder="https://" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="isActive" valuePropName="checked">
                <Checkbox>Account Active</Checkbox>
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="hideActivity" valuePropName="checked">
                <Checkbox>Hide Activity</Checkbox>
              </Form.Item>
            </Col>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>
              <Form.Item name="reportAllRows" valuePropName="checked">
                <Checkbox>All Report Rows</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          {!isEditForm && (
            <>
              <Divider />
              <h1>{sectionNumberCounter++}. Organization Contacts </h1>
              <br />
              <Row gutter={[GRID_GUTTER, 0]}>
                <Col span={GRID_COL_FULL_ROW_SPAN}>
                  <Form.Item
                    name="contacts"
                    rules={[required('array'), minLength(1, 'array')]}
                  >
                    <SubscriberContacts isCreateView />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Divider />
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Form.Item>
                <div className={styles.wrapperButtons}>
                  <Button
                    key="cancelBtn"
                    htmlType="reset"
                    type="default"
                    onClick={
                      isEditForm
                        ? onCancel
                        : () => setIsCancelCreateSubscriber(true)
                    }
                    className={styles.cancelBtn}
                  >
                    {'Cancel'}
                  </Button>
                  <Button
                    key="createBtn"
                    htmlType="submit"
                    type="primary"
                    className={styles.actionBtn}
                  >
                    {isEditForm ? 'Update Subscriber' : 'Create Subscriber'}
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      <CancelConfirmModal
        visible={isCancelCreateSubscriber}
        onClose={() => setIsCancelCreateSubscriber(false)}
      />
    </Row>
  );
};
