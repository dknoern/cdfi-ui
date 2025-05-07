import { Company, Tag, Library, GlobalMetric, Portfolio } from 'types';
import { GraphMeta } from 'types/graphs';

export type SelectedMetric = GlobalMetric & {
  isNew?: boolean;
};

export interface FormData {
  name: Portfolio['name'];
  tags: Tag['id'][];
  investments: Company['id'][];
  assignedMetrics: SelectedMetric[];
  charts: GraphMeta['id'][];
  // skip library step
  libraryId?: Library['id'];
}

export interface FormSaveModel {
  name: Portfolio['name'];
  tags: Tag['id'][];
  investments: Company['id'][];
  assignedMetrics: (
    | Omit<GlobalMetric, 'id'> // created metric
    | Pick<GlobalMetric, 'id'> // existing metric
  )[];
  graphs: GraphMeta['id'][];
  // skip library step
  library?: { templateId: Library['id'] };
}
