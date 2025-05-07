import React, { FC, useState, useMemo, useCallback } from 'react';
import { Form, Button, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { metricDependenciesStore } from 'store';
import { withCategoryPrefix } from './tools';
import styles from '../Popover.module.scss';

export type TagCategorySelectorProps = {
  onCancel: () => void;
  onSubmit: (values: Store) => void;
  initialValues: Store;
};

export const TagCategorySelector: FC<TagCategorySelectorProps> = ({
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const { tagGroupsMap } = metricDependenciesStore;
  const [form] = Form.useForm();

  const [categoryId, setCategoryId] = useState<number | null>(
    initialValues.categoryId,
  );

  const subCats = useMemo(() => {
    if (!categoryId) return [];

    return (
      tagGroupsMap.user
        .find((tagCategory) => tagCategory.id === categoryId)
        ?.categories.map((category) => ({
          label: category.name,
          value: category.id,
        })) ?? []
    );
  }, [categoryId, tagGroupsMap.user]);

  const handleChange = useCallback(
    (value) => {
      setCategoryId(value);
      form.setFieldsValue({ subcategoryId: '' });
    },
    [form],
  );

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        size="middle"
        onFinish={onSubmit}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item label="Update category for selected item:" name="categoryId">
          <Select
            onChange={handleChange}
            placeholder="Select Category"
            options={tagGroupsMap.user.map((tag) => ({
              label: tag.name,
              value: tag.id,
            }))}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          label="Update subcategory for selected item:"
          name="subcategoryId"
        >
          <Select
            placeholder="Select Subcategory"
            options={[
              {
                value: '',
                label: 'None',
              },
              ...subCats,
            ]}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        <div className={styles.buttons}>
          <Button
            id={withCategoryPrefix('cancelButton')}
            htmlType="reset"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            id={withCategoryPrefix('updateButton')}
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
