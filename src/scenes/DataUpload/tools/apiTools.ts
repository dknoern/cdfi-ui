import { uiText } from 'constants/uiText';
import { library as libraryManager } from 'dataManagement';
import { downloadFetchedFile } from 'tools/fileDownloadTools';
import { showAPIError } from 'tools';

export const downloadReportingTemplate = (): Promise<void> => {
  return libraryManager
    .downloadReportingTemplate()
    .then(downloadFetchedFile)
    .catch(showAPIError(uiText('reportedData', 'reportingTemplateError')));
};
