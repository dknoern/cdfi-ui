import { ColumnType } from 'antd/lib/table';
import { TagTableItem } from 'types/tagTableItem';
import { sortByBoolean, sortByName } from 'tools';
import {
  renderCompanies,
  renderTag,
  renderMetrics,
  renderTagCategory,
  renderTagGroup,
} from './tools';

export const tagsColumns: ColumnType<TagTableItem>[] = [
  {
    title: 'Tags',
    dataIndex: 'tag',
    sorter: (a, b): number => sortByName(a.tag, b.tag),
    sortDirections: ['ascend', 'descend'],
    defaultSortOrder: 'ascend',
    render: renderTag,
  },
  {
    title: 'Tag Group',
    dataIndex: 'group',
    sorter: {
      compare: (a, b): number =>
        sortByBoolean(a.tag.isSystemTag, b.tag.isSystemTag) ||
        sortByName(
          a.tag.category.parent ? a.tag.category.parent : a.tag.category,
          b.tag.category.parent ? b.tag.category.parent : b.tag.category,
        ) ||
        sortByName(a.tag, b.tag),
      multiple: 1,
    },
    sortDirections: ['ascend', 'descend'],
    render: renderTagGroup,
    defaultSortOrder: 'ascend',
    width: '10%',
  },
  {
    title: 'Tag Category',
    dataIndex: 'category',
    sorter: (a, b): number =>
      sortByName(
        a.tag.category.parent ? a.tag.category : { name: '' },
        b.tag.category.parent ? b.tag.category : { name: '' },
      ),
    sortDirections: ['ascend', 'descend'],
    render: renderTagCategory,
    width: '10%',
  },
  {
    title: 'Metrics',
    dataIndex: 'metrics',
    render: renderMetrics,
  },
  {
    title: 'Reporting Entities',
    dataIndex: 'companies',
    filterMultiple: true,
    render: renderCompanies,
  },
];
