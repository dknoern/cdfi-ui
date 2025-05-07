import React, { FC, useState, useMemo, useCallback } from 'react';
import { Form, Button, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { TagCategoryParent } from 'types';
import { metricDependenciesStore } from 'store';
import { withCategoryPrefix } from './tools';
import styles from '../Popover.module.scss';

const { Option } = Select;

export type CategorySelectorProps = {
  onCancel: () => void;
  onSubmit: (values: Store) => void;
};

export const CategorySelector: FC<CategorySelectorProps> = ({
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [rootCat, setRootCat] = useState<TagCategoryParent['id'] | null>(null);

  const { categories: cats, subCategories: subCats } = metricDependenciesStore;

  const subCatsFiltered = useMemo(() => {
    if (!rootCat || !subCats) return [];
    return subCats.filter((cat) => cat.parentId === rootCat);
  }, [subCats, rootCat]);

  const changeRootCat = useCallback(
    (rootCategory) => {
      setRootCat(rootCategory);
      const subCat = (subCats || []).find(
        (cat) => cat.parentId === rootCategory,
      );
      if (subCat) {
        form.setFieldsValue({ parentId: subCat.id });
      } else {
        form.setFieldsValue({ parentId: '' });
      }
    },
    [subCats, form],
  );

  return (
    <div className={styles.container}>
      <Form layout="vertical" size="middle" onFinish={onSubmit} form={form}>
        <Form.Item
          label="Update category for selected metrics:"
          name="grandParentId"
        >
          <Select
            onChange={changeRootCat}
            placeholder="Select Category"
            showSearch
            optionFilterProp="children"
          >
            <Option value="">None</Option>
            {cats.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Update subcategory for selected metrics:"
          name="parentId"
        >
          <Select
            disabled={subCatsFiltered.length < 1}
            placeholder="Select Subcategory"
            showSearch
            optionFilterProp="children"
          >
            <Option value="">None</Option>
            {subCatsFiltered.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
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
            disabled={rootCat === null}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
