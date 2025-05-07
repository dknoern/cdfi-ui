import { Company } from 'types';
import { ReportedDataTableConfig } from 'types/reportedDataTableConfig';
import { apiProcessor } from 'tools';
import { reportedDataTableConverters } from 'dataConverters/reportedDataTableConfig';

export const getReportedDataTableConfig = (
  pcId: Company['id'],
): Promise<ReportedDataTableConfig> => {
  const OPERATION = 'companyReportedDataTableConfig';

  return apiProcessor
    .get(OPERATION, pcId)
    .then(reportedDataTableConverters.server2Client);
};

export const updateReportedDataTableConfig = (
  pcId: Company['id'],
  configData: ReportedDataTableConfig,
): Promise<ReportedDataTableConfig> => {
  const OPERATION = 'companyReportedDataTableConfig';

  return apiProcessor
    .patch(
      OPERATION,
      pcId,
      reportedDataTableConverters.client2Server(configData),
    )
    .then(reportedDataTableConverters.server2Client);
};
