import React, { FC, useMemo, ReactNode, useCallback } from 'react';
import { Row, Col, TreeSelect, Tag as AntTag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Tag } from 'types';
import { GRID_GUTTER } from 'constants/ui';
import { extractTags } from 'tools/tagsTool';
import { metricDependenciesStore } from 'store';
import { getTagClassName, tagsFilterFn } from 'forms/CompanyInfoForm/tools';
import { makeTagsNodeTree } from './tools';
import styles from './Tags.module.scss';

type TagsProps = {
  onChange?: (tags: Tag['id'][]) => void;
  value?: Tag['id'][];
  selectColSpan?: number;
};

export const Tags: FC<TagsProps> = ({ onChange, value, selectColSpan }) => {
  const { allTagCategories: tags } = metricDependenciesStore;

  const allTags = useMemo(() => {
    if (!tags) return [];

    return extractTags(tags);
  }, [tags]);

  const tagsTree = useMemo(() => {
    if (!tags) return [];

    return makeTagsNodeTree(tags);
  }, [tags]);

  const removeTag = useCallback(
    (tagId) => {
      if (!value) return [];

      return value.filter((item) => item !== tagId);
    },
    [value],
  );

  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col flex="auto">
          <TreeSelect
            switcherIcon={<DownOutlined />}
            treeCheckable
            showArrow
            dropdownClassName={styles.tagsDropdown}
            treeData={tagsTree}
            placeholder="Select Tags"
            value={value}
            filterTreeNode={tagsFilterFn}
            maxTagCount={0}
            maxTagPlaceholder={(): ReactNode => (
              <span>Selected Tags: {(value || []).length}</span>
            )}
            onChange={onChange}
          />
        </Col>
      </Row>
      <div className={styles.tagsContainer}>
        {allTags
          .filter((tag) => (value || []).includes(tag.id))
          .map((tag) => (
            <AntTag
              key={tag.id}
              closable
              className={getTagClassName(tag.group)}
              onClose={(): void => {
                if (onChange) onChange(removeTag(tag.id));
              }}
            >
              {tag.name}
            </AntTag>
          ))}
      </div>
    </>
  );
};
