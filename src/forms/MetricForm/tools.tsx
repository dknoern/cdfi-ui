import React from 'react';
import { Tag, TagGroup, TagCategory } from 'types';
import { TAGS_IRIS_CAT_ID, TAGS_SDGS_CAT_ID } from 'constants/misc';
import { makeTagsHierarchy } from 'tools/tagsTool';
import { momentFormat2Unicode, unicodeFormat2moment } from 'tools/date';
import { initTagsMap } from './constants';
import { TagTreeItem, TagsMapType } from './types';

const constructTag = (categoryId: number) => (tag: Tag): TagTreeItem => {
  return {
    title: tag.name,
    key: tag.id,
    value: tag.id,
    categoryId,
  };
};

const constructCat = (category: TagCategory): TagTreeItem => {
  return {
    title: <span>{category.name}</span>,
    value: `cat${category.id}`,
    key: `cat${category.id}`,
    checkable: false,
    selectable: false,
    children: [
      ...(category.categories || []).map(constructCat),
      ...(category.tags || []).map(constructTag(category.id)),
    ],
  };
};
const constructRootCat = (category: TagCategory): TagTreeItem[] => {
  return [
    ...(category.categories || []).map(constructCat),
    ...(category.tags || []).map(constructTag(category.id)),
  ];
};

export const makeTagsTree = (tagCategories: TagCategory[]): TagsMapType => {
  if (!tagCategories.length) {
    return initTagsMap;
  }

  const root = makeTagsHierarchy(tagCategories);

  const sdgs = root.find((cat) => cat.id === TAGS_SDGS_CAT_ID);
  const irisplus = root.find((cat) => cat.id === TAGS_IRIS_CAT_ID);
  const custom = root.filter(
    (cat) => ![TAGS_SDGS_CAT_ID, TAGS_IRIS_CAT_ID].includes(cat.id),
  );

  const map = new Map([
    [TagGroup.sdgs, sdgs ? constructRootCat(sdgs) : []],
    [TagGroup.irisplus, irisplus ? constructRootCat(irisplus) : []],
    [TagGroup.custom, custom ? custom.map(constructCat) : []],
  ]);

  return map;
};

// ONLY FOR "DATE FORMAT" field, not for VALUE!
// we need this to convert moment.js (used in Ant datepicker) format into unicode
export const dateFormatNormalizer = (
  value: string,
  prevValue: unknown,
  prevValues: unknown,
): string => {
  return momentFormat2Unicode(value);
};

export const dateFormatDeNormalizer = (value: string | undefined): object => {
  return { value: value && unicodeFormat2moment(value) };
};
