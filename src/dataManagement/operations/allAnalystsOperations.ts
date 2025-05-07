import { apiProcessor } from '../../tools/apiProcessor';
import { Analyst } from '../../scenes/Dashboard/scenes/CdfiDashboard/types';

export const getAllAnalysts = (): Promise<Analyst[]> => {
  return apiProcessor.get('allAnalysts');
};


