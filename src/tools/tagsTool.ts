import {
  TagCategory,
  TagGroup,
  Tag,
  TagGroupsMap,
  TagMap,
  TagCategoryMap,
  TagIdsMap,
} from 'types';
import { tagGroupNames } from 'constants/tagGroup';
import { dataMan } from 'dataManagement';

// for cases like REs
const tagsMan = dataMan.managers.tags;
export const injectTags = <T extends { tags: Tag['id'][] }>(
  item: T,
): T & { tags: Tag[] } => {
  const tags: Tag[] = [];
  item.tags.forEach((tagId) => {
    const tag = tagsMan.plainTagsMap.get(tagId);
    if (tag) {
      tags.push(tag);
    }
  });

  return Object.assign(item, { tags });
};

const mapCategoryIdToGroup = (id: TagCategory['id']): TagGroup => {
  switch (id) {
    case 1:
      return TagGroup.sdgs;
    case 2:
      return TagGroup.irisplus;
    default:
      return TagGroup.custom;
  }
};

// extract tags array from TagCategory[]
export const extractTags = (
  tagsTreeCats: TagCategory[],
  group?: TagGroup,
): Tag[] => {
  const result: Tag[] = [];

  tagsTreeCats.forEach((category) => {
    const setGroup =
      group || mapCategoryIdToGroup(category.parentId || category.id);

    if (category.tags) {
      result.push(
        ...category.tags.map((item) => ({ ...item, group: setGroup })),
      );
    }
    if (category.categories) {
      result.push(...extractTags(category.categories, setGroup));
    }
  });

  return result;
};

export const getTagsMap = (data: TagCategory[]): TagMap => {
  const tagsMap: TagMap = new Map();

  data.forEach((tagCategory) => {
    (tagCategory.tags ?? []).forEach((tag) => {
      tagsMap.set(tag.id, tag);
    });
  });

  return tagsMap;
};

export const getTagCategoriesMap = (data: TagCategory[]): TagCategoryMap => {
  const tagCategoriesMap: TagCategoryMap = new Map();

  data.forEach((tagCategory) => {
    tagCategoriesMap.set(tagCategory.id, tagCategory);
  });

  return tagCategoriesMap;
};

export const convertTags = (tagCategories: TagCategory[]): TagGroupsMap => {
  const tagGroups: TagGroupsMap = {
    user: [],
    system: [],
  };

  tagCategories.forEach((tagCategory) => {
    if (!tagCategory.parentId)
      tagGroups[tagCategory.isSystemCategory ? 'system' : 'user'].push({
        ...tagCategory,
        categories: [],
      });
  });

  tagCategories.forEach((tagCategory) => {
    if (tagCategory.parentId) {
      const tagGroup = tagGroups[
        tagCategory.isSystemCategory ? 'system' : 'user'
      ].find((group) => group.id === tagCategory.parentId);
      if (tagGroup) tagGroup.categories.push(tagCategory);
    }
  });

  return tagGroups;
};

export const getTagIdsMap = (tagMap: TagGroupsMap): TagIdsMap => {
  const tagIds: TagIdsMap = {
    [TagGroup.custom]: [],
    [TagGroup.irisplus]: [],
    [TagGroup.sdgs]: [],
  };

  tagMap.user.forEach((tagCategory) => {
    tagCategory.categories.forEach((item) => {
      tagIds[TagGroup.custom].push(...(item.tags ?? []).map((tag) => tag.id));
    });
    tagIds[TagGroup.custom].push(
      ...(tagCategory.tags ?? []).map((tag) => tag.id),
    );
  });

  tagMap.system.forEach((tagCategory) => {
    const tagGroup =
      tagCategory.name === tagGroupNames.irisplus
        ? TagGroup.irisplus
        : TagGroup.sdgs;
    tagCategory.categories.forEach((item) => {
      tagIds[tagGroup].push(...(item.tags ?? []).map((tag) => tag.id));
    });
    tagIds[tagGroup].push(...(tagCategory.tags ?? []).map((tag) => tag.id));
  });

  return tagIds;
};

export const extractTagsIds = (tags?: TagIdsMap): Tag['id'][] => {
  if (tags) {
    return [
      ...(tags[TagGroup.sdgs] ?? []),
      ...(tags[TagGroup.irisplus] ?? []),
      ...(tags[TagGroup.custom] ?? []),
    ];
  }
  return [];
};

export const makeTagsHierarchy = (
  tagCategories: TagCategory[],
): TagCategory[] => {
  const parentCats = tagCategories
    .filter((cat) => !cat.parentId)
    .map((item) => ({ ...item }));

  tagCategories
    .filter((cat) => cat.parentId)
    .forEach((subCat) => {
      const parentCat = parentCats.find((cat) => cat.id === subCat.parentId);

      if (parentCat) {
        if (!parentCat.categories) {
          parentCat.categories = [subCat];
        } else {
          parentCat.categories.push(subCat);
        }
      }
    });

  return parentCats;
};
