import { Company, Dashboard, Portfolio, DashboardChartCategory } from 'types';
import { uiText } from 'constants/uiText';
import { uiStore, workDataStore } from 'store';
import { apiProcessor } from 'tools';
import { showAPIError } from 'tools/APITools';
import { reaction } from 'mobx';
import { ManagerDefault } from './ManagerDefault';

export class DashboardManager extends ManagerDefault {
  init = (): void => {
    if (!this.loadTriggered) {
      this.resetStore();
      this.reload();

      reaction(
        () => [
          workDataStore.viewModeConfig.portfolioId,
          workDataStore.viewModeConfig.companyId,
        ],
        ([portfolioId, companyId]) => {
          if (portfolioId || companyId) this.reload();
        },
      );
    }
  };

  getDashboard = ({
    portfolioId,
    companyId,
  }: {
    companyId: Company['id'] | null;
    portfolioId: Portfolio['id'] | null;
  }): Promise<Dashboard> => {
    if (!portfolioId && !companyId) {
      throw new Error('portfolioId and companyId both are not specified');
    }

    const OPERATION = companyId ? 'companyDashboard' : 'portfolioDashboard';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION, companyId || portfolioId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  reloadDashboard = (): Promise<Dashboard> => {
    const { portfolioId, companyId } = workDataStore.viewModeConfig;

    return this.getDashboard({ portfolioId, companyId });
  };

  reload = (): void => {
    this.proceedReload(
      this.reloadDashboard,
      showAPIError(uiText('dashboard', 'dataLoadError')),
    );
  };

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
