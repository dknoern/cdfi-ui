import { Company, Dashboard, Portfolio, DashboardChartCategory } from 'types';
import { uiText } from 'constants/uiText';
import { cdfiStore, uiStore, userStore, workDataStore } from 'store';
import { apiProcessor } from 'tools';
import { showAPIError } from 'tools/APITools';
import { reaction } from 'mobx';
import { ManagerDefault } from './ManagerDefault';

// const { cdfiId } = cdfiStore;
export class AerisDashboardManager extends ManagerDefault {
  init = (): void => {
    if (!this.loadTriggered) {
      this.resetStore();
      this.reload();
      reaction(
        () => [workDataStore.viewModeConfig.companyId],
        ([, companyId]) => {
          if (companyId) this.reload();
        },
      );
    }
  };

  getDashboard = ({
    companyId,
  }: {
    companyId: Company['id'] | null;
  }): Promise<Dashboard> => {
    if (!companyId) {
      throw new Error('CompanyId not specified');
    }

    const OPERATION = companyId ? 'aerisGraphDashboard' : '';
    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION, companyId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  reloadDashboard = (): Promise<Dashboard> => {
    const { companyId } = userStore;
    return this.getDashboard({ companyId });
  };

  reload = (): void => {
    this.proceedReload(
      this.reloadDashboard,
      showAPIError(uiText('dashboard', 'dataLoadError')),
    );
  };

  // Leave this code here in case we want to allow some updates to the graphs
  updateGraphCategory = (
    chartCategoryId: DashboardChartCategory['id'],
    categoryData: DashboardChartCategory,
  ): Promise<void> => {
    const OPERATION = 'updateDashboardGraphCategory';
    uiStore.addLoading(OPERATION);
    return apiProcessor
      .patch(OPERATION, chartCategoryId, categoryData)
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };
}
