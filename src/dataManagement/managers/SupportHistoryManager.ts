import { ManagerDefault } from './ManagerDefault';
import { emailAerisSupport } from 'dataManagement/operations/supportHistoryOperations';
import { SupportHistory } from 'types/supportHistory';
import { notifyUser } from 'tools';
import { uiText } from 'constants/uiText';
import { getSupportHistory } from 'dataManagement/operations/supportHistoryOperations';

export interface SupportHistoryManagerResults {
  supportHistory: SupportHistory[];
}

export class SupportHistoryManager extends ManagerDefault<SupportHistoryManagerResults> {
  reload = (companyId?: number): void => {
    if (!companyId) return;
    this.getSupportHistory(companyId);
  };

  getSupportHistory = (companyId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getSupportHistory(companyId)]).then(
          (values): SupportHistoryManagerResults => ({
            supportHistory: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('supportHistory', 'loadError'));
      },
    );
  };

  emailAerisSupport: typeof emailAerisSupport = (data) => {
    return emailAerisSupport(data);
  };
}