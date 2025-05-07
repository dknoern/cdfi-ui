import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import { MetricCategory } from 'types/metricCategory';
import { InnerSidebar } from 'components';
import { metricDependenciesStore } from 'store';
import { store } from '../store';
import styles from './Categories.module.scss';

const disabledCreateNewCategoryButton = true;

const hasChildren = (categoryId: MetricCategory['id']): boolean => {
  return metricDependenciesStore.allCategories.some(
    (item) => item.parentId === categoryId,
  );
};

// level 0 for tags
const renderTree = (
  level: number,
  parent: MetricCategory['id'] | null,
  openCats: MetricCategory['id'][],
): React.ReactNode => {
  return (
    <ul>
      {metricDependenciesStore.allCategories
        .filter(
          (item) =>
            item.parentId === parent && item.id !== 42 && item.parentId !== 42,
        )
        .map((item) => {
          const itemHasChildren = hasChildren(item.id);
          return (
            <li
              key={item.id}
              className={openCats.includes(item.id) ? styles.open : undefined}
            >
              <div
                className={`${styles.categoryHeader} ${
                  store.isActive(item.id) ? styles.active : undefined
                }`}
              >
                <button
                  type="button"
                  onClick={(): void => store.setCategory(item.id)}
                  className={`${level === 1 ? styles.categoryBtn : undefined}`}
                >
                  {item.name}
                </button>
                {itemHasChildren && (
                  <button
                    type="button"
                    onClick={(): void => store.toggleCategoryOpen(item.id)}
                    className={styles.arrowBtn}
                    title="Expand"
                  >
                    <DownOutlined />
                  </button>
                )}
              </div>
              {itemHasChildren && renderTree(level + 1, item.id, openCats)}
            </li>
          );
        })}
    </ul>
  );
};

type CategoriesProps = {
  onAddCategory: VoidFn;
  isVisible: boolean;
  onClose: VoidFn;
};

export const Categories: FC<CategoriesProps> = observer(
  ({ onAddCategory, isVisible, onClose }) => {
    return (
      <InnerSidebar isVisible={isVisible} className={styles.categoryPanel}>
        <h4 className={styles.header}>Metric Categories</h4>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <LeftOutlined />
        </button>
        <button
          type="button"
          className={
            disabledCreateNewCategoryButton ? styles.disabled : styles.special
          }
          onClick={onAddCategory}
          disabled={disabledCreateNewCategoryButton}
        >
          + Create New Category
        </button>
        {renderTree(1, null, store.openCategories)}
        <button
          type="button"
          className={`${styles.categoryHeader} ${
            store.isNoCategoryActive ? styles.active : undefined
          }`}
          onClick={store.setNoCategoryFilter}
        >
          No category
        </button>
      </InnerSidebar>
    );
  },
);
