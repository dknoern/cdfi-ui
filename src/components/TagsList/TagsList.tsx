import React, { FC, ReactNode, useMemo, useState } from 'react';
import { Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Tag as TagType } from 'types';
import { CustomTag } from 'components/CustomTag';
import styles from './TagsList.module.scss';

type TagItem = {
  id: number | string;
  name: string;
  tag?: TagType;
};

type TagsListProps = {
  items: TagItem[];
  type?: 'default' | 'custom';
};

const SHOW_MIN_TAGS_COUNTER = 4;

export const TagsList: FC<TagsListProps> = ({ items, type = 'default' }) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const tags = useMemo<ReactNode>(
    () =>
      items
        .slice(0, showAllTags ? items.length : SHOW_MIN_TAGS_COUNTER)
        .map((item) => {
          if (type === 'custom' && item.tag) {
            return <CustomTag key={item.id} tag={item.tag} />;
          }

          return (
            <Tag className={styles.defaultTag} key={item.id}>
              {item.name}
            </Tag>
          );
        }),
    [type, items, showAllTags],
  );

  if (items.length < 1) {
    return null;
  }

  return (
    <>
      {tags}
      {items.length > SHOW_MIN_TAGS_COUNTER && (
        <Tag
          onClick={(): void => setShowAllTags(!showAllTags)}
          className={`${styles.arrowBtn} ${
            showAllTags ? styles.opened : styles.closedTag
          }`}
        >
          <DownOutlined />
        </Tag>
      )}
    </>
  );
};
