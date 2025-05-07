import React, { FC } from 'react';
import { Col, Form, Input, Row, Space } from 'antd';
import { FormProps } from 'types/form';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { matchesRegex, required } from 'tools/formRules';

export interface InitialsFormData {
  documentTypeId: number;
  initials: string;
}

export const AffirmAsCurrentForm: FC<FormProps<InitialsFormData>> = ({
  onFinish,
  formId,
}) => {
  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          I certify, and have the authority to certify, that the latest document
          has been uploaded to the Aeris Cloud.
          <Space></Space>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="initials"
            rules={[required(), matchesRegex.initials]}
            label="Enter your initials"
          >
            <Input placeholder="Initials" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
