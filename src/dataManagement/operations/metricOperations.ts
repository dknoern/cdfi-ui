import { apiProcessor } from 'tools/apiProcessor';
import { Metric } from 'types';

export const loadMetrics = (cdfiId?: number): Promise<Metric[]> =>
  apiProcessor.get('metrics', cdfiId);
