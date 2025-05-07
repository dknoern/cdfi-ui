import React, { FC, useMemo } from 'react';
import { Form, Button, TreeSelect } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Tag, VoidFn } from 'types';
import { metricDependenciesStore } from 'store';
import { makeTagTree, validateTags } from './tools';
import styles from '../../Popover.module.scss';
import tagStyles from './TagSelector.module.scss';

type TagSelectorProps = {
  onCancel: VoidFn;
  onSubmit: (values: { tags: Tag['id'][] }) => void;
  value: Tag['id'][];
};

export const TagSelector: FC<TagSelectorProps> = ({
  onCancel,
  onSubmit,
  value,
}) => {
  const {
    allTagCategories: tags,
    tagIdsMap: tagsMapData,
  } = metricDependenciesStore;

  const tagsTree = useMemo(() => {
    if (!tags) return [];

    return makeTagTree(tags);
  }, [tags]);

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        size="middle"
        onFinish={onSubmit}
        initialValues={{ tags: value }}
      >
        <Form.Item
          label="Update tags for selected metrics:"
          name="tags"
          rules={[
            {
              validator: (_, values): Promise<void> =>
                validateTags(5, values, tagsMapData),
            },
          ]}
        >
          <TreeSelect
            treeData={tagsTree}
            treeCheckable
            switcherIcon={<DownOutlined />}
            showArrow
            dropdownClassName={tagStyles.tagsDropdown}
            showCheckedStrategy="SHOW_ALL"
            placeholder="Select Tags"
            maxTagCount={0}
            maxTagPlaceholder={(values): React.ReactNode =>
              `Selected tags: ${values.length}`
            }
            showSearch
            treeNodeFilterProp="title"
          />
        </Form.Item>
        <div className={styles.buttons}>
          <Button
            id="cancelUpdateTagsButton"
            htmlType="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button id="updateTagsButton" type="primary" htmlType="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
