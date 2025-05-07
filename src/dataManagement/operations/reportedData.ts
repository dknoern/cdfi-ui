import { apiProcessor } from 'tools';
import { ReportedData, ReportedData4Period } from 'types/reportedData';

export const getReportedData = (
  companyId: number,
  loadEmpty: boolean,
): Promise<ReportedData> =>
  apiProcessor.get(
    loadEmpty ? 'reportedDataWithEmpty' : 'reportedData',
    companyId,
  );

// used by PC
export const savePeriodData = (report: ReportedData4Period): Promise<void> => {
  return apiProcessor.post('saveReport4period', null, report);
};
