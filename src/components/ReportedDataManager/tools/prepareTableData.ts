import { DataItem } from 'types/reportedData';
import {
  MetricCategory,
  MetricSubCategory,
  MetricSharePeriod,
  MetricType,
} from 'types';
import { MetricRequestStatus } from 'types/metricRequestStatus';
import styles from 'components/ReportedDataTable.module.scss';

interface RowItem extends DataItem {
  children?: DataItem[];
}

export const injectCats = (
  reportedData: DataItem[] | null,
  cats: MetricCategory[],
  subCats: MetricSubCategory[],
): RowItem[] | null => {
  if (!reportedData) return null;

  const usedCats = new Set();
  const usedSubCats = new Set();
  reportedData.forEach((item) => {
    usedCats.add(item.categoryId);
    usedSubCats.add(item.subcategoryId);
  });

  const commonProps = {
    metricId: 0,
    type: MetricType.NUMERIC,
    code: '',
    values: [],
    requestStatus: MetricRequestStatus.NOT_REQUIRED,
    frequency: MetricSharePeriod.QUARTERLY,
  };

  const result: RowItem[] = [];

  cats
    .filter((cat) => usedCats.has(cat.id))
    .forEach((cat) => {
      const catCommonProps = {
        ...commonProps,
        categoryId: cat.id,
        categoryName: cat.name,
        isCatLine: true,
      };

      // form sub-categories with their metrics
      const catSubs = subCats
        .filter((subCat) => subCat.parentId === cat.id)
        .filter((subCat) => usedSubCats.has(subCat.id))
        .map((subCat) => ({
          ...catCommonProps,
          isSubCat: true,
          rowKey: `sc${subCat.id}`,
          name: subCat.name,
          subcategoryId: subCat.id,
          subcategoryName: subCat.name,
          children: reportedData.filter(
            (item) => item.subcategoryId === subCat.id,
          ),
        }));

      // firstly show metrics of this cat but no subcat, then the sub-cats
      result.push({
        ...catCommonProps,
        isCat: true,
        rowKey: `c${cat.id}`,
        name: cat.name,
        subcategoryId: 0,
        subcategoryName: '',
        children: reportedData
          .filter((item) => item.categoryId === cat.id && !item.subcategoryId)
          .concat(catSubs),
      });
    });

  // Metrics without category should be displayed last
  const noCategoryMetrics = reportedData.filter(
    (item) => item.categoryId === null,
  );

  if (noCategoryMetrics.length > 0) {
    result.push({
      ...commonProps,
      name: 'No Category',
      categoryId: 0,
      subcategoryId: 0,
      categoryName: '',
      subcategoryName: '',
      rowKey: 'c0',
      isCatLine: true,
      isCat: true,
      children: noCategoryMetrics,
    });
  }

  return result;
};

export const makeExpandedRowKeys = (
  reportedData: DataItem[] | null,
): React.Key[] => {
  if (!reportedData) return [];

  const result = new Set<React.Key>(['c0']);
  reportedData.forEach((item) => {
    result.add(`c${item.categoryId}`);
    result.add(`sc${item.subcategoryId}`);
  });

  return Array.from(result);
};

export const makeRowClassName = (record: DataItem, index: number): string => {
  if (!record.isCat && !record.isSubCat) return '';
  return record.isCat ? styles.catRow : styles.subCatRow;
};
