import { ReactNode } from 'react';
import { ColumnType } from 'antd/lib/table';
import { GraphMeta, GraphType } from 'types/graphs';
import { graphTypeNames } from 'constants/graphType';
import { sortByString } from 'tools';

export const chartColumns = (
  graphTypes: GraphType[],
): ColumnType<GraphMeta>[] => [
  {
    title: 'Table/Chart',
    dataIndex: 'title',
    sorter: (a: GraphMeta, b: GraphMeta): number =>
      sortByString(a.title ?? '', b.title ?? ''),
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Chart Type',
    dataIndex: 'graphType',
    onFilter: (value: string | number | boolean, record: GraphMeta): boolean =>
      record.graphType === value,
    render: (value: string, record: GraphMeta, index: any): ReactNode => {
      return graphTypeNames[record.graphType];
    },
    filters: graphTypes.map((type) => ({
      text: graphTypeNames[type as GraphType],
      value: type,
    })),
  },
  {
    title: 'Description',
    dataIndex: 'notes',
    onFilter: (value: string | number | boolean, record: GraphMeta): boolean =>
      record.notes === value,
  },
];
