import { when, reaction, decorate, observable, action } from 'mobx';
import {
  TagCategory,
  Tag,
  MetricCategory,
  MetricSubCategory,
  TagGroupsMap,
  TagGroup,
  TagIdsMap,
  TagMap,
  TagCategoryMap,
} from 'types';
import { dataMan } from 'dataManagement/managers';
import {
  convertTags,
  getTagIdsMap,
  getTagsMap,
  getTagCategoriesMap,
} from 'tools/tagsTool';
import { userStore } from './userStore';

const MetricCategoriesMgr = dataMan.managers.metricCategories;
const TagsMgr = dataMan.managers.tags;

const defaultTagGroupsMap: TagGroupsMap = { user: [], system: [] };

const defaultTagIds: TagIdsMap = {
  [TagGroup.custom]: [],
  [TagGroup.irisplus]: [],
  [TagGroup.sdgs]: [],
};

class MetricDependenciesStore {
  // all categories
  allTagCategories: TagCategory[] = [];

  // map of tags
  tagsMap: TagMap = new Map();

  // map of tag categories
  tagCategoriesMap: TagCategoryMap = new Map();

  // map of categories based on system or user group
  tagGroupsMap: TagGroupsMap = defaultTagGroupsMap;

  // map of tag's ids based on tag group (custom, iris, sdgs)
  tagIdsMap: TagIdsMap = defaultTagIds;

  allCategories: MetricCategory[] = [];

  categories: MetricCategory[] = [];

  subCategories: MetricSubCategory[] = [];

  constructor() {
    when(
      () => userStore.isFM && userStore.readyToUse,
      () => {
        TagsMgr.init();
        MetricCategoriesMgr.init();
      },
    );

    reaction(
      () => TagsMgr.store.data,
      () => {
        if (!TagsMgr.dataReady) return;

        this.setTags(TagsMgr.store.data ?? []);
      },
    );

    reaction(
      () => MetricCategoriesMgr.store.data,
      () => {
        if (!MetricCategoriesMgr.dataReady) return;

        this.setCategories(MetricCategoriesMgr.store.data as MetricCategory[]);
      },
    );
  }

  setTags = (data: TagCategory[]): void => {
    this.allTagCategories = data;
    this.tagGroupsMap = convertTags(data);
    this.tagsMap = getTagsMap(data);
    this.tagCategoriesMap = getTagCategoriesMap(data);
    this.tagIdsMap = getTagIdsMap(this.tagGroupsMap);
  };

  setCategories = (data: MetricCategory[]): void => {
    this.allCategories = data;
    this.categories = data.filter((cat) => cat.parentId === null);
    this.subCategories = data.filter(
      (cat) => cat.parentId !== null,
    ) as MetricSubCategory[];
  };

  resetTags = (): void => {
    this.allTagCategories = [];
    this.tagsMap = new Map();
    this.tagCategoriesMap = new Map();
    this.tagGroupsMap = defaultTagGroupsMap;
    this.tagIdsMap = defaultTagIds;
  };

  resetCategories = (): void => {
    this.allCategories = [];
    this.categories = [];
    this.subCategories = [];
  };

  reloadTags = (): void => {
    TagsMgr.reload();
  };

  reloadCategories = (): void => {
    MetricCategoriesMgr.reload();
  };

  tagById = (id: Tag['id']): Tag | undefined => {
    return this.tagsMap.get(id);
  };

  tagCategoryById = (id: Tag['id']): TagCategory | undefined => {
    return this.tagCategoriesMap.get(id);
  };
}

decorate(MetricDependenciesStore, {
  allTagCategories: observable,
  tagsMap: observable,
  tagCategoriesMap: observable,
  tagGroupsMap: observable,
  tagIdsMap: observable,
  setTags: action,
  reloadTags: action,
  resetTags: action,
  allCategories: observable,
  categories: observable,
  subCategories: observable,
  setCategories: action,
  resetCategories: action,
  reloadCategories: action,
});

export const metricDependenciesStore = new MetricDependenciesStore();
