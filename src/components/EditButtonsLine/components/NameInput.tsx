import React, { PropsWithChildren } from 'react';
import { Form, Button, Input } from 'antd';
import { VoidFn } from 'types';
import { FormSubmitFn } from 'types/form';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import { NameEditDataType } from '../types';
import { withNamePrefix } from './tools';
import styles from '../Popover.module.scss';

export type NameInputProps<IdType> = {
  onCancel: VoidFn;
  onSubmit: FormSubmitFn<void, NameEditDataType<IdType>>;
  initialValues: NameEditDataType<IdType>;
};

export const NameInput = <IdType,>({
  onCancel,
  onSubmit,
  initialValues,
}: PropsWithChildren<NameInputProps<IdType>>): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <div className={styles.container}>
      <Form
        form={form}
        onFinish={onSubmit(form)}
        layout="vertical"
        size="middle"
        initialValues={initialValues}
        requiredMark={false}
      >
        <Form.Item
          label="Update name for selected item:"
          name="name"
          rules={[required(), minLength(), maxLength(), restrictWhitespace()]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <div className={styles.buttons}>
          <Button
            id={withNamePrefix('cancelButton')}
            htmlType="reset"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            id={withNamePrefix('updateButton')}
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
