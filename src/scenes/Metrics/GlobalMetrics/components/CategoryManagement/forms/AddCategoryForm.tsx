import React, { FC } from 'react';
import { Form, Select, Input } from 'antd';
import { FormProps } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import { FormLabelWithIcon } from 'components';
import { required, minLength, maxLength } from 'tools/formRules';
import { metricDependenciesStore } from 'store';
import styles from './CategoriesForm.module.scss';

type AddCategoryFormProps = {
  formId: string;
  onFinish: FormProps['onFinish'];
  initialValues?: Store;
};

export const AddCategoryForm: FC<AddCategoryFormProps> = ({
  formId,
  onFinish,
  initialValues,
}) => {
  const { categories: rootCats } = metricDependenciesStore;
  const [form] = Form.useForm();

  return (
    <Form
      id={formId}
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      requiredMark={false}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label={<FormLabelWithIcon text="Name" className={styles.label} />}
        colon={false}
        rules={[required(), minLength(), maxLength()]}
      >
        <Input placeholder="Enter new name" />
      </Form.Item>
      <Form.Item
        name="parentId"
        colon={false}
        label={
          <FormLabelWithIcon text="Category parent" className={styles.label} />
        }
      >
        <Select
          options={[
            { value: '', label: 'None' },
            ...rootCats.filter(item => item.id !== 42).map((cat) => ({ value: cat.id, label: cat.name })),
          ]}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>
    </Form>
  );
};
