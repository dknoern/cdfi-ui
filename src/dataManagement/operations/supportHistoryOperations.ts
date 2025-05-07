import { apiProcessor } from 'tools/apiProcessor';
import { performRequest } from 'tools/APITools';
import { SupportHistoryEmailFormData } from 'scenes/SupportHistory/SupportHistoryEmailForm';
import { SupportHistory } from 'types/supportHistory';

export const getSupportHistory = (companyId?: number): Promise<SupportHistory[]> => {
  return apiProcessor.get('supportHistory', companyId);
};

export const emailAerisSupport = (
  data: SupportHistoryEmailFormData,
): Promise<void> => {
  return performRequest<void>('supportHistorySendEmail', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};