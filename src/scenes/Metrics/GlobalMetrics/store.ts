import { decorate, observable, action, computed } from 'mobx';
import { MetricCategory } from 'types';
import { metricDependenciesStore } from 'store';

const defaultViewConfig = {
  categoryId: null,
  subCategoryId: null,
};

type ViewConfig = {
  categoryId: MetricCategory['id'] | null;
  subCategoryId: MetricCategory['id'] | null;
};

class MetricManagementStore {
  viewConfig: ViewConfig = defaultViewConfig;

  openCategories: MetricCategory['id'][] = [];

  noCategoryFilter = false;

  setCategory = (categoryId: MetricCategory['id']): void => {
    const category = metricDependenciesStore.allCategories.find(
      (item) => item.id === categoryId,
    );

    if (!category) return;

    // by default -> root cat
    let newConfig: ViewConfig = {
      categoryId,
      subCategoryId: null,
    };
    let newParentCategoryId = categoryId;

    // it is not a root category
    if (category.parentId) {
      newConfig = {
        categoryId: category.parentId,
        subCategoryId: category.id,
      };
      newParentCategoryId = category.parentId;
    }

    this.viewConfig = newConfig;

    if (!this.openCategories.includes(newParentCategoryId)) {
      this.openCategories = [...this.openCategories, newParentCategoryId];
    }

    this.noCategoryFilter = false;
  };

  setNoCategoryFilter = (): void => {
    this.viewConfig = defaultViewConfig;
    this.noCategoryFilter = true;
  };

  resetConfig = (): void => {
    this.viewConfig = defaultViewConfig;
    this.noCategoryFilter = false;
  };

  resetOpenCategories = (): void => {
    this.openCategories = [];
  };

  toggleCategoryOpen = (categoryId: MetricCategory['id']): void => {
    if (!this.openCategories.includes(categoryId)) {
      this.openCategories = [...this.openCategories, categoryId];
      return;
    }

    this.openCategories = this.openCategories.filter(
      (item) => item !== categoryId,
    );
  };

  isActive = (categoryId: MetricCategory['id']): boolean => {
    if (this.viewConfig.subCategoryId === categoryId) return true;
    if (
      this.viewConfig.categoryId === categoryId &&
      !this.viewConfig.subCategoryId
    )
      return true;
    return false;
  };

  get isNoCategoryActive(): boolean {
    return this.noCategoryFilter;
  }

  get category(): MetricCategory {
    const categoryId =
      this.viewConfig.subCategoryId || this.viewConfig.categoryId;

    if (!categoryId)
      return {
        id: 0,
        name: '',
        parentId: null,
        owner: 0,
        accountCode: '',
      };

    return metricDependenciesStore.allCategories.find(
      (item) => item.id === categoryId,
    ) as MetricCategory;
  }

  get filterActive(): boolean {
    return !!(this.viewConfig.subCategoryId || this.viewConfig.categoryId);
  }
}

decorate(MetricManagementStore, {
  viewConfig: observable,
  openCategories: observable,
  noCategoryFilter: observable,
  setCategory: action,
  resetConfig: action,
  toggleCategoryOpen: action,
  setNoCategoryFilter: action,
  resetOpenCategories: action,
  category: computed,
  filterActive: computed,
  isNoCategoryActive: computed,
});

export const store = new MetricManagementStore();
