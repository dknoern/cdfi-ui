import { Company } from './company';
import { GraphMeta } from './graphs';
import { Library } from './library';
import { CompanyMetric } from './metric';
import { Tag } from './tag';

export interface Portfolio {
  id: number;
  name: string;
  investments: Company[];
  totalInvestments: string;
  tags: Tag[];
}

export type EditPortfolioData = Pick<Portfolio, 'name'> & {
  investments: Company['id'][];
  tags: Tag['id'][];
  assignedMetrics: CompanyMetric[];
  graphs: GraphMeta['id'][];
  library: Library['id'] | null;
};
