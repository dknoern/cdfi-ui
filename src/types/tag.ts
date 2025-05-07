import { Metric } from './metric';
import { Company } from './company';

export interface Tag {
  id: number;
  name: string;
  ownerId: number;
  isSystemTag: boolean;
  category: TagCategory | TagCategoryParent;
  group?: TagGroup;
  description?: string;
  categoryId: TagCategory['id'];
}

export interface TagCategoryParent {
  id: number;
  name: string;
  parent: null | TagCategoryParent;
}

export interface TagCategory {
  id: number;
  name: string;
  ownerId: number;
  parentId: TagCategoryParent['id'] | null;
  tags: Tag[] | null;
  isSystemCategory: boolean;
  categories?: TagCategory[];
  parent?: TagCategoryParent;
}

export type GlobalTagGroup = 'user' | 'system';

export enum TagGroup {
  custom = 'custom',
  sdgs = 'sdgs',
  irisplus = 'irisplus',
}

export type TagGroupsCategory = Pick<
  TagCategory,
  'id' | 'name' | 'tags' | 'ownerId' | 'parentId' | 'isSystemCategory'
> & {
  categories: TagCategory[];
};

export type GlobalTag = { tag: Tag; metrics: Metric[]; companies: Company[] };

export type TagGroupsMap = { [key in GlobalTagGroup]: TagGroupsCategory[] };

export type TagIdsMap = { [key in TagGroup]: Tag['id'][] };

export type TagCategoryMap = Map<TagCategory['id'], TagCategory>;

export type TagMap = Map<Tag['id'], Tag>;
