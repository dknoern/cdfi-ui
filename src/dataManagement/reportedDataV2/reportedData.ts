import { apiProcessor } from 'tools';
import { Company } from 'types';
import {
  ReportedData,
  ReportedDataRequestData,
  ReportedDataView,
} from 'types/reportedDataV2';
import { reportedDataConverters } from 'dataConverters/reportedData';

class ReportedDataManager {
  load = (companyId: Company['id']): Promise<ReportedDataView> => {
    const endpoint = 'reportedDataV2';

    return apiProcessor
      .get(endpoint, companyId)
      .then((data: ReportedData) => reportedDataConverters.server2Client(data));
  };

  loadWithData = (
    companyId: Company['id'],
    requestData: ReportedDataRequestData,
  ): Promise<ReportedDataView> => {
    const endpoint = 'reportedDataV2ForCompany';

    return apiProcessor
      .post(endpoint, companyId, requestData)
      .then((data: ReportedData) => reportedDataConverters.server2Client(data));
  };
}

export const reportedData = new ReportedDataManager();
