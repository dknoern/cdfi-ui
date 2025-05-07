import React, { FC } from 'react';
import { Form, Col, Row, Input, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { FormProps } from 'antd/lib/form/Form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { MIN_LENGTH_TEXT } from 'constants/validation';
import { GRID_COL_FULL_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { FormLabelWithIcon } from 'components';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import { frequencyOptions } from './constants';
import styles from './CreateFolderForm.module.scss';

type CreateFolderFormProps = {
  onFinish: FormProps['onFinish'];
  formId: string;
  initialValues: Store;
};

export const CreateFolderForm: FC<CreateFolderFormProps> = ({
  formId,
  onFinish,
  initialValues,
}) => {
  return (
    <Form
      id={formId}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="vertical"
      className={styles.form}
      hideRequiredMark
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN / 2}>
          <Form.Item
            name="name"
            label={
              <FormLabelWithIcon
                description="Enter name for new folder."
                text="1. Name of new folder"
                icon={QuestionCircleOutlined}
              />
            }
            rules={[required(), minLength(), maxLength(), restrictWhitespace()]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_FULL_ROW_SPAN / 2}>
          <Form.Item
            name="frequency"
            label={
              <FormLabelWithIcon
                description="Select frequency"
                text="2. Reporting Frequency"
                icon={QuestionCircleOutlined}
              />
            }
            rules={[required()]}
          >
            <Select placeholder="Select Frequency" options={frequencyOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            label={
              <FormLabelWithIcon
                description="Type here description for the new folder"
                text="3. Description"
                icon={QuestionCircleOutlined}
                hint="Optional"
              />
            }
            name="description"
            rules={[maxLength(), minLength(MIN_LENGTH_TEXT)]}
          >
            <Input.TextArea placeholder="Enter Description" rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
