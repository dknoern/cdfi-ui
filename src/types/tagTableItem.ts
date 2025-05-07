import { Tag, Company, Metric } from 'types';

export enum TagTableColumns {
  TAG = 'tag',
  GROUP = 'group',
  CATEGORY = 'category',
  METRICS = 'metrics',
  COMPANIES = 'companies',
}

export interface TagTableItem {
  tag: Pick<Tag, 'id' | 'name' | 'category' | 'isSystemTag'>;
  companies: Pick<Company, 'id' | 'name'>[];
  metrics: Pick<Metric, 'id' | 'name'>[];
}
