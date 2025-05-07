import { TagGroup } from 'types';

export type TagGroupNames = {
  [key in keyof typeof TagGroup]: string;
};

export const tagGroupNames: TagGroupNames = {
  [TagGroup.custom]: 'Custom Category',
  [TagGroup.irisplus]: 'IRIS+',
  [TagGroup.sdgs]: 'SDGs',
};
