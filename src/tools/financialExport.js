import { toast } from 'react-toastify';
import { downloadFetchedFile } from 'tools/fileDownloadTools';
import { uiText } from 'constants/uiText';
import { apiProcessor } from './apiProcessor';
import { makeFetch } from './APITools';
import { Log } from './Log';

const EXPORT_CHECK_INTERVAL = 1000;

class FinancialExporter {
  progress = 0;

  startExport = (companyId) => {
    const url = `${apiProcessor.APIURI}/api/financials/export/${companyId}/v2?showChange=true&showPctChange=true&showAllYears=true`;

    return makeFetch({ url })
      .then(() => {
        this.progress = 5;

        return this.waitReady(companyId)
          .then(() => this.downloadExport(companyId))
          .catch((e) => {
            this.resetProcess();
            Log.error('[FinancialExporter] waitReady', e);

            toast(uiText('reportedData', 'exportError'), {
              type: 'error',
            });
          })
          .finally(() => {
            this.progress = 5;
          });
      })
      .catch(() => {
        this.resetProcess();

        toast(uiText('reportedData', 'exportError'), {
          type: 'error',
        });
      });
  };

  waitReady = (companyId) =>
    new Promise((resolve, reject) => {
      this.checkTimer = setInterval(() => {
        this.checkStatus(companyId)
          .then((data) => {
            if (!data.working) {
              reject(new Error(`Error while ${data.currentProcess}`));
            }
            if (data.percentage === 100) {
              resolve(true);
            }
          })
          .catch(() => {
            this.resetProcess();
            reject(new Error('Error during financials export'));
          });
      }, EXPORT_CHECK_INTERVAL);
    });

  checkStatus = (companyId) => {
    return apiProcessor
      .get('financialsExportCheckStatus', companyId)
      .then((data) => {
        if (!data || !data.percentage) {
          throw new Error('Error while status check');
        }

        Log.log('[FinancialExporter] checkStatus data', data);
        if (!this.exportProgress || this.exportProgress < data.percentage) {
          this.progress = data.percentage;
        }
        return data;
      });
  };

  downloadExport = (companyId) => {
    Log.log('Download export');

    this.resetProcess();

    makeFetch({
      url: apiProcessor.makeEndpoint('financialsExportGet', companyId),
      contentType: 'text/plain; charset=x-user-defined',
    }).then((response) => {
      downloadFetchedFile(response);
    });
  };

  resetProcess = () => {
    clearInterval(this.checkTimer);
    this.progress = 0;
  };
}

export const financialExporter = new FinancialExporter();
window.financialExporter = financialExporter;
