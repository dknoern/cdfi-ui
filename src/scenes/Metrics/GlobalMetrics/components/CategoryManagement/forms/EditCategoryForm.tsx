import React, { FC } from 'react';
import { Form, Input, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { FormProps } from 'antd/lib/form';
import { FormLabelWithIcon } from 'components';
import { required, minLength, maxLength } from 'tools/formRules';
import { metricDependenciesStore } from 'store';
import styles from './CategoriesForm.module.scss';

type EditCategoryFormProps = {
  initialValues: Store;
  formId: string;
  onFinish: FormProps['onFinish'];
};

export const EditCategoryForm: FC<EditCategoryFormProps> = ({
  initialValues,
  onFinish,
  formId,
}) => {
  const { categories: rootCats } = metricDependenciesStore;

  return (
    <Form
      id={formId}
      initialValues={initialValues}
      requiredMark={false}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        colon={false}
        label={<FormLabelWithIcon text="Name" className={styles.label} />}
        rules={[required(), minLength(), maxLength()]}
      >
        <Input placeholder="Enter new name" />
      </Form.Item>
      {initialValues.parentId && (
        <Form.Item
          name="parentId"
          colon={false}
          label={
            <FormLabelWithIcon
              text="Category parent"
              className={styles.label}
            />
          }
        >
          <Select
            options={[
              { value: '', label: 'None' },
              ...rootCats.map((cat) => ({ value: cat.id, label: cat.name })),
            ]}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
      )}
    </Form>
  );
};
