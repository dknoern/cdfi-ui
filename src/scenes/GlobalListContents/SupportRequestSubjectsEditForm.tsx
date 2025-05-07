import React, { FC, useEffect } from 'react';
import { Col, Form, Input, Row, Button } from 'antd';
import { GlobalListContentsFormProps as SupportRequestSubjectsFormProps } from 'types/form';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { required } from 'tools/formRules';

export interface SupportRequestSubjectsFormData {
  subject: string;
  isEnabled: boolean;
}

export const SupportRequestSubjectsEditForm: FC<
  SupportRequestSubjectsFormProps<SupportRequestSubjectsFormData>
> = ({ onFinish, formId, form, initialValues }) => {
  const isEditValueForm = formId === 'SUPPORT_REQUEST_EDIT_VALUE_FORM';

  useEffect(() => {
    if (initialValues?.subject) {
      form.setFieldsValue({ subject: initialValues.subject, isEnabled: true });
    }
  });

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      form={form}
      hideRequiredMark
      initialValues={initialValues}
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col
          span={
            isEditValueForm ? GRID_COL_FULL_ROW_SPAN : GRID_COL_HALF_ROW_SPAN
          }
        >
          <Form.Item name="subject" rules={[required()]}>
            <Input placeholder="Enter new support request subject" />
          </Form.Item>
          <Form.Item
              style={{ height: 0 }}
              initialValue={true}
              id="GLOBAL_LIST_EDIT"
              name="isEnabled"
            >
              <Input hidden />
            </Form.Item>
        </Col>
        {!isEditValueForm && (
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Button type="primary" htmlType="submit">
              Add value to list
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  );
};
