import React from 'react';
import { TagCategory, Tag, TagGroup, TagIdsMap } from 'types';
import { tagGroupNames } from 'constants/tagGroup';
import { formRuleMessages } from 'tools/formRules';
import styles from '../../Popover.module.scss';

export const tagsMapFn = (tag: Tag): any => {
  return {
    title: tag.name,
    value: tag.id,
  };
};

export const makeTagTree = (tagCategories: TagCategory[]): any => {
  const result: any[] = [];
  const subCats = tagCategories.filter((cat) => cat.parentId !== null);

  tagCategories.forEach((tagCat) => {
    if (tagCat.parentId === null) {
      result.push({
        title: <span className={styles.category}>{tagCat.name}</span>,
        value: `cat${tagCat.id}`,
        key: `cat${tagCat.id}`,
        selectable: false,
        checkable: false,
        children: [
          ...subCats
            .filter((cat) => cat.parentId === tagCat.id)
            .map((subCat) => ({
              title: <span className={styles.category}>{subCat.name}</span>,
              value: `cat${subCat.id}`,
              key: `cat${subCat.id}`,
              selectable: false,
              checkable: false,
              children: (subCat.tags || []).map(tagsMapFn),
            })),
          ...(tagCat.tags || []).map(tagsMapFn),
        ],
      });
    }
  });

  return result;
};

const getTagType = (tagsMapData: TagIdsMap, tagId: number): TagGroup => {
  if (tagsMapData.sdgs.includes(tagId)) {
    return TagGroup.sdgs;
  }
  if (tagsMapData.irisplus.includes(tagId)) {
    return TagGroup.irisplus;
  }
  return TagGroup.custom;
};

export const validateTags = (
  maxTagsCounter: number,
  values: Tag['id'][],
  tagsMapData: TagIdsMap,
): Promise<void> => {
  const tagMap = {
    [TagGroup.sdgs]: 0,
    [TagGroup.irisplus]: 0,
    [TagGroup.custom]: 0,
  };
  values.forEach((item) => {
    tagMap[getTagType(tagsMapData, item)] += 1;
  });
  if (
    tagMap.sdgs > maxTagsCounter ||
    tagMap.irisplus > maxTagsCounter ||
    tagMap.custom > maxTagsCounter
  ) {
    const tagType =
      tagGroupNames[
        Object.keys(TagGroup).find(
          (tag) => tagMap[tag as TagGroup] > maxTagsCounter,
        ) as TagGroup
      ];
    return Promise.reject(
      new Error(formRuleMessages(maxTagsCounter, tagType).tags),
    );
  }
  return Promise.resolve();
};
