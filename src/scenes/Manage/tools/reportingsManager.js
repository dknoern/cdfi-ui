import { apiProcessor, Log } from 'tools';
import { userStore, uiStore } from 'store';

class ReportingsManager {
  loadData = ({ companyId, year, quarter }) => {
    uiStore.addLoading('LOAD_REPORTING');

    return apiProcessor
      .get('reporting', { companyId, year, quarter })
      .catch((e) => {
        Log.error('[ReportingsManager] loadData', e);
        return e;
      })
      .finally(() => {
        uiStore.endLoading('LOAD_REPORTING');
      });
  };

  loadReportings = (companyId) => {
    uiStore.addLoading('LOAD_REPORTINGS');

    return apiProcessor
      .get('reportings', companyId || userStore.userInfo.companyId)
      .catch((e) => {
        Log.error('[ReportingsManager] loadReportings', e);
        throw e;
      })
      .finally(() => {
        uiStore.endLoading('LOAD_REPORTINGS');
      });
  };
}

export const reportingsManager = new ReportingsManager();
