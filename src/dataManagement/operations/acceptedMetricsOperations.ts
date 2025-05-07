import { apiProcessor } from 'tools/apiProcessor';
import { AcceptedMetric } from 'types';

export const listAcceptedMetrics = (): Promise<AcceptedMetric[]> =>
  apiProcessor.get('pcAcceptedMetrics');
