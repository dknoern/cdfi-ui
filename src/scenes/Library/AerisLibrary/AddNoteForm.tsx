import React, { FC } from 'react';
import { Col, Form, Row } from 'antd';
import { FormProps } from 'types/form';
import { GRID_COL_FULL_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { required } from 'tools/formRules';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

export interface AddNoteFormData {
  documentTypeId: number;
  note: string;
}

export const AddNoteForm: FC<FormProps<AddNoteFormData>> = ({
  onFinish,
  formId,
}) => {
  const label =
    'Subject: comment-' + moment().format('DD-MM-YYYY') + '-Annual-Rating';

  return (
    <Form id={formId} onFinish={onFinish} layout="vertical">
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="note"
            rules={[required()]}
            label={formId === 'VIEW_MODIFY_NOTE' ? '' : label}
          >
            <TextArea
              placeholder="Enter note details"
              maxLength={255}
              style={{ marginTop: 20 }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
