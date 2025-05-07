import { CdfiSubscription } from '../../types';
import { apiProcessor } from '../../tools';

export const getCdfiSubscriptions = (
  companyId: number,
): Promise<CdfiSubscription[]> => {
  return apiProcessor.get('cdfiSubscriptions', companyId);
};