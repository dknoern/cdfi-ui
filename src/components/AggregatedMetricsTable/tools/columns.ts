import { ColumnType } from 'antd/lib/table';
import {
  MetricColumnWidth,
  MetricColumns,
} from 'types/aggregatedMetricTableItem';
import { renderMetricList, renderName } from './renderHelpers';
import { AggregatedMetric } from '../../../types';

interface CalcColumnsType {
  defaultColumns: ColumnType<AggregatedMetric>[];
  columnWidth?: MetricColumnWidth;
}
export const columns = ({
  defaultColumns,
  columnWidth,
}: CalcColumnsType): ColumnType<AggregatedMetric>[] => {
  return defaultColumns.map((columnConfig) => {
    switch (columnConfig.dataIndex) {
      case MetricColumns.NAME:
        return {
          ...columnConfig,
          width: columnWidth?.name,
          render: renderName,
        };
      case MetricColumns.METRICS:
        return {
          ...columnConfig,
          render: renderMetricList,
          width: columnWidth?.metrics,
        };
      default:
        return {
          ...columnConfig,
        };
    }
  });
};
