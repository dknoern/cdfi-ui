import { ColumnProps } from 'antd/es/table';
import {
  GraphPreviewViewMetricEquationItem,
  GraphPreviewViewWithMetricData,
} from 'types/graphs';

export const makeColumns = (
  previewData: GraphPreviewViewWithMetricData,
): ColumnProps<GraphPreviewViewMetricEquationItem>[] => {
  return [
    {
      key: 'formula',
      title: 'Formula',
      dataIndex: 'name',
      fixed: 'left',
      width: 150,
    },
    ...previewData.periods.map((period) => ({
      key: period,
      title: period,
      dataIndex: period,
      width: 110,
    })),
  ];
};
