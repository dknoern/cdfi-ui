import { set } from 'mobx';
import { ReportedDataTableConfig } from 'types/reportedDataTableConfig';
import { uiText } from 'constants/uiText';
import { workDataStore } from 'store';
import { showAPIError } from 'tools';
import {
  getReportedDataTableConfig,
  updateReportedDataTableConfig,
} from '../operations/reportedDataTableConfigOperations';
import { ManagerDefault } from './ManagerDefault';

export class ReportedDataTableConfigManager extends ManagerDefault {
  reload = (): void => {
    if (!workDataStore.companyId) return;

    this.proceedReload(
      () => getReportedDataTableConfig(workDataStore.companyId),
      showAPIError(uiText('dashboard', 'reportedDataTableConfigLoadError')),
    );
  };

  updateReportedDataTableConfig = (
    config: ReportedDataTableConfig,
  ): Promise<ReportedDataTableConfig> => {
    set(this.store, { isLoading: true });
    return updateReportedDataTableConfig(workDataStore.companyId, config)
      .then((updatedConfig) => {
        set(this.store, { data: updatedConfig });

        return updatedConfig;
      })
      .finally(() => {
        set(this.store, { isLoading: false });
      });
  };
}
