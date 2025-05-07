import { TagGroup, AssignedMetric, Metric, TagIdsMap } from 'types';

export interface TagTreeItem {
  title: React.ReactNode;
  value: string | number;
  key: string | number;
  checkable?: boolean;
  selectable?: boolean;
  children?: TagTreeItem[];
  categoryId?: number;
}

export type TagsMapType = Map<TagGroup, TagTreeItem[]>;

export type EditMetricType = Omit<
  AssignedMetric,
  'status' | 'tags' | 'parentId' | 'grandParentId'
> & {
  tags?: TagIdsMap;
  parentId?: Metric['parentId'] | '';
  grandParentId?: Metric['grandParentId'] | '';
};
