import { GraphMeta } from './graphs';

export interface DashboardChartCategory {
  id: number;
  name: string;
  graphs: GraphMeta['id'][];
}

export interface Dashboard {
  id: number;
  graphCategories: DashboardChartCategory[];
}
