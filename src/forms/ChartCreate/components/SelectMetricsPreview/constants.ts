import { ColumnProps } from 'antd/lib/table';
import { GraphPreviewViewMetricEquationItem } from 'types/graphs';
import { sortByString } from 'tools';

export const tableCols: ColumnProps<GraphPreviewViewMetricEquationItem>[] = [
  {
    key: 'metric',
    title: 'Metric',
    dataIndex: 'name',
    fixed: true,
    width: 200,
  },
  {
    key: 'code',
    title: 'Code',
    dataIndex: 'code',
    fixed: true,
    sorter: (a, b): number => sortByString(a.code || '', b.code || ''),
    width: 80,
  },
];
