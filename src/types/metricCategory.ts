import { Company } from './company';

export interface MetricCategory {
  id: number;
  name: string;
  accountCode: string;
  owner: Company['id'];
  parentId: null | MetricCategory['id'];
}

export type MetricSubCategory = Omit<MetricCategory, 'parentId'> & {
  parentId: MetricCategory['id'];
};
