import React, { FC } from 'react';
import { Form } from 'antd';
import { REEditFormData } from 'types';
import { FORM_ITEM_VERTICAL_LABEL_SPAN } from 'constants/ui';
import { minLength, required } from 'tools/formRules';
import { FormPrimaryLabel } from 'components';
import { REInfoGroup, TagsGroup, Contacts } from 'forms/shared';
import { FormSubmitFn } from 'types/form';

type REEditFormProps = {
  formId: string;
  onFinish: FormSubmitFn<void, REEditFormData>;
  initialValues?: REEditFormData;
};

export const REEditForm: FC<REEditFormProps> = ({
  onFinish,
  initialValues,
  formId,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      id={formId}
      form={form}
      size="large"
      hideRequiredMark
      onFinish={onFinish(form)}
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      initialValues={initialValues}
    >
      <REInfoGroup />
      <Form.Item
        name="contacts"
        label={<FormPrimaryLabel num={3} text="Contacts" />}
        rules={[required('array'), minLength(1, 'array')]}
      >
        <Contacts isCreateView={!initialValues} />
      </Form.Item>
      <TagsGroup num={4} />
    </Form>
  );
};
