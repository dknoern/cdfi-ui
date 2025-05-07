import { apiProcessor } from 'tools/apiProcessor';
import { performRequest, showAPIError } from 'tools/APITools';
import { CustomDataReportFormData } from 'scenes/CustomDataReports/CustomDataReportsAdmin/CustomDataReportCreateForm';
import { CustomDataReport } from 'types';
import { downloadStaticDocumentParameter } from './documentOperations';
import { makeFetch } from 'tools';
import { downloadFetchedFile } from 'tools/fileDownloadTools';
import { uiText } from 'constants/uiText';


export const getCustomDataReports = (
  customReportType?: string,
): Promise<CustomDataReport[]> => {
  return apiProcessor.get('customDataReports', customReportType);
};

export const getCustomDataReportsSubscriber = (
  subscriberId?: number,
): Promise<CustomDataReport[]> => {
  return apiProcessor.get('customDataReportsSubscriber', subscriberId);
};

export const getCustomDataReportsCdfi = (
  subscriberId?: number,
): Promise<CustomDataReport[]> => {
  return apiProcessor.get('customDataReportsCdfi', subscriberId);
};

export const getCustomDataReport = (
  customDataReportId: number,
): Promise<CustomDataReportFormData> => {
  return apiProcessor.get('customDataReport', customDataReportId);
};

export const createCustomDataReport = (
  data: CustomDataReportFormData,
): Promise<void> => {
  return performRequest<void>('customDataReportsCreate', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateCustomDataReport = (
  customDataReportId: number,
  data?: CustomDataReportFormData,
): Promise<void> => {
  return performRequest<void>('customDataReport', (operationName) =>
    apiProcessor.put(operationName, customDataReportId, {
      ...data,
    }),
  );
};

export const uploadCustomDataReport = (
  customDataReportId: number,
  data?: FormData,
): Promise<void> => {
  return apiProcessor.post(
    'customDataReportDocument',
    customDataReportId,
    data,
  );
};

export const deleteCustomDataReport = (
  customDataReportId: number,
): Promise<void> => {
  return apiProcessor.delete('customDataReport', customDataReportId);
};

export const downloadCustomDataReport = (
  customDataReportId: number,
): Promise<void> => {
  return downloadStaticDocumentParameter('customDataReportDocument', customDataReportId, 'customDataReport');
};

export const downloadCustomDataReports = (
  customDataReportIds: string,
): Promise<void> => {
  return makeFetch({
    url: apiProcessor.makeEndpoint('customDataReportsZipDocuments', customDataReportIds),
  })
    .then((response) => {
      downloadFetchedFile(response);
    })
    .catch(showAPIError(uiText('customDataReport', 'downloadError')));
};

export const sendCustomDataReportToClient = (
  customDataReportId: number,
): Promise<void> => {
  return apiProcessor.post('customDataReportSendToClient', customDataReportId);
};
