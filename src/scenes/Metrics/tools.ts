import { TagGroup, Tag, TagIdsMap } from 'types';

export const formatCurrentsTags = (
  tagGroupsIds: TagIdsMap,
  metricsTags: Tag['id'][] = [],
): TagIdsMap => {
  const currentTags: TagIdsMap = {
    [TagGroup.sdgs]: [],
    [TagGroup.irisplus]: [],
    [TagGroup.custom]: [],
  };

  Object.keys(tagGroupsIds).forEach((group) => {
    currentTags[group as TagGroup] = tagGroupsIds[group as TagGroup].filter(
      (tag) => metricsTags.indexOf(tag) !== -1,
    );
  });

  return currentTags;
};
