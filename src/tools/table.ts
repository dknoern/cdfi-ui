import { ColumnFilterItem } from 'antd/lib/table/interface';
import { MetricCategory, MetricSubCategory } from 'types';

export const items2FilterOptions = (
  items: {
    id: number;
    name: string;
  }[],
): ColumnFilterItem[] =>
  items.map((item) => ({
    text: item.name,
    value: item.id,
  }));

export const calcFilterSubCats = (
  allSubCats: MetricSubCategory[],
  selectedCats: React.Key[] | null,
): ColumnFilterItem[] | undefined => {
  let filteredSubCats = allSubCats;
  if (selectedCats && selectedCats.length > 0) {
    filteredSubCats = allSubCats.filter((subCat) =>
      selectedCats.includes(String(subCat.parentId)),
    );
  }
  return items2FilterOptions(filteredSubCats);
};

export const calcFilterCats = (
  allCats: MetricCategory[],
  allSubCats: MetricSubCategory[],
  selectedSubCats: React.Key[] | null,
): ColumnFilterItem[] | undefined => {
  let filteredCats = allCats;
  if (selectedSubCats && selectedSubCats.length > 0) {
    const selectedSubCatParentIds = allSubCats
      .filter((subCat) => selectedSubCats.includes(String(subCat.id)))
      .map((subCat) => subCat.parentId);

    filteredCats = allCats.filter((cat) =>
      selectedSubCatParentIds.includes(cat.id),
    );
  }
  return items2FilterOptions(filteredCats);
};
