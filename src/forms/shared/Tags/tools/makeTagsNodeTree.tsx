import React from 'react';
import { TagCategory, Tag } from 'types';
import { makeTagsHierarchy } from 'tools/tagsTool';
import { Tag4Tree, TagTree } from '../types';
import styles from './Tags.module.scss';

const makeTitle = (
  type: 'category' | 'subCategory' | 'tag',
  text: string,
): JSX.Element => {
  let className = styles.tag;

  switch (type) {
    case 'category':
      className = styles.category;
      break;
    case 'subCategory':
      className = styles.subCategory;
      break;
    default:
      break;
  }

  return <span className={className}>{text}</span>;
};

const tagsMapFn = (categoryId: number) => (tag: Tag): Tag4Tree => ({
  title: makeTitle('tag', tag.name),
  value: tag.id,
  categoryId,
});

export const makeTagsNodeTree = (tagCategories: TagCategory[]): TagTree => {
  if (!tagCategories) return [];

  return makeTagsHierarchy(tagCategories)
    .filter(
      (cat) =>
        (!!cat.tags && cat.tags.length > 0) ||
        (!!cat.categories && cat.categories.length > 0),
    )
    .map((cat) => ({
      title: <span className={styles.category}>{cat.name}</span>,
      value: `cat${cat.id}`,
      key: `cat${cat.id}`,
      selectable: false,
      checkable: false,
      children: [
        ...(cat.categories || []).map((subCat) => ({
          title: <span>{subCat.name}</span>,
          value: `subCat${subCat.id}`,
          key: `subCat${subCat.id}`,
          selectable: false,
          checkable: false,
          children: subCat.tags?.map(tagsMapFn(cat.id)),
        })),
        ...(cat.tags || []).map(tagsMapFn(cat.id)),
      ],
    }));
};
