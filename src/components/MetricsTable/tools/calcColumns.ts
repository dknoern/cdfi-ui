import { ColumnType } from 'antd/lib/table';
import { metricSharePeriodNames } from 'constants/metricSharePeriod';
import { metricTypeNames } from 'constants/metricType';
import { items2FilterOptions, calcFilterSubCats, calcFilterCats } from 'tools';
import {
  Tag,
  MetricCategory,
  MetricSubCategory,
  MetricType,
  MetricSharePeriod,
} from 'types';
import {
  MetricRecord,
  MetricRowItem,
  FilterState,
  ColumnWidth,
  MetricColumns,
} from 'types/metricTableItem';
import {
  renderGrandParentValue,
  renderTagValue,
  renderParentValue,
  renderNameValue,
} from './renderHelpers';

interface CalcColumnsType {
  defaultColumns: ColumnType<MetricRecord | MetricRowItem>[];
  cats: MetricCategory[];
  subCats: MetricSubCategory[];
  tags: Tag[];
  filters: FilterState;
  columnWidth?: ColumnWidth;
  types: MetricType[];
  frequencies: MetricSharePeriod[];
  showStatusIcon?: boolean;
}
export const calcColumns = ({
  defaultColumns,
  filters,
  cats,
  subCats,
  tags,
  types,
  frequencies,
  columnWidth,
  showStatusIcon = false,
}: CalcColumnsType): ColumnType<MetricRecord | MetricRowItem>[] => {
  return defaultColumns.map((columnConfig) => {
    let filtersConfig;
    switch (columnConfig.dataIndex) {
      case MetricColumns.NAME:
        return {
          ...columnConfig,
          width: columnWidth?.name,
          render: renderNameValue(showStatusIcon),
        };
      case MetricColumns.ACCOUNT_CODE:
        return {
          ...columnConfig,
          width: columnWidth?.accountCode,
        };
      case MetricColumns.GRANDPARENT_ID:
        filtersConfig = calcFilterCats(cats, subCats, filters.parentId);
        return {
          ...columnConfig,
          filters: filtersConfig,
          render: renderGrandParentValue(cats),
          width: columnWidth?.grandParentId,
        };
      case MetricColumns.PARENT_ID:
        filtersConfig = calcFilterSubCats(subCats, filters.grandParentId);
        return {
          ...columnConfig,
          filters: filtersConfig,
          render: renderParentValue(subCats),
          width: columnWidth?.parentId,
        };
      case MetricColumns.TAGS:
        return {
          ...columnConfig,
          filters: items2FilterOptions(tags),
          render: renderTagValue(tags),
          width: columnWidth?.tags,
        };
      case MetricColumns.FREQUENCY:
        return {
          ...columnConfig,
          filters: frequencies.map((period) => ({
            text: metricSharePeriodNames[period as MetricSharePeriod],
            value: period,
          })),
          width: columnWidth?.frequency ?? 200,
        };
      case MetricColumns.TYPE:
        return {
          ...columnConfig,
          filters: types.map((type) => ({
            text: metricTypeNames[type as MetricType],
            value: type,
          })),
          width: columnWidth?.type,
        };
      default:
        return {
          ...columnConfig,
        };
    }
  });
};
