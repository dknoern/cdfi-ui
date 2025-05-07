import React, { FC } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { SupportHistoryEmailFormProps } from 'types/form';
import { GRID_COL_FULL_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { useSupportRequestSubjects } from 'dataManagement/usePlatformSettings';
import { required } from 'tools/formRules';

export interface SupportHistoryEmailFormData {
  subject: string;
  inquiry: string;
}

const { TextArea } = Input;

export const SupportHistoryEmailForm: FC<
  SupportHistoryEmailFormProps<SupportHistoryEmailFormData>
> = ({ onFinish, formId, form }) => {
  const { data } = useSupportRequestSubjects();

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      form={form}
      hideRequiredMark
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="subject"
            label={'Email Request Subject'}
            rules={[required()]}
          >
            <Select
              placeholder="Select a subject"
              options={data?.subjects?.filter(item => item.isEnabled).map((subject) => ({
                value: subject.subject,
                label: subject.subject,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item name="inquiry" rules={[required()]}>
            <TextArea
              placeholder="Enter the details of your request"
              maxLength={1000}
              showCount
              rows={7}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
