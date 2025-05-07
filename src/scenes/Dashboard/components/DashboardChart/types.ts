import { DashboardChartCategory } from 'types';
import { GraphMeta } from 'types/graphs';

export interface ToggleChartHandler {
  (id: GraphMeta['id']): void;
}

export interface UpdateGraphHandler {
  (data: DashboardChartCategory): void;
}
