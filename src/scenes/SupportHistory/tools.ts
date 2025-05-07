import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { SupportHistoryManager } from 'dataManagement/managers/SupportHistoryManager';
import { SupportHistoryEmailFormData } from './SupportHistoryEmailForm';

const mgr = dataMan.manager(
  ManagerName.supportHistory,
) as SupportHistoryManager;

interface EmailAerisSupportFn {
  (data: SupportHistoryEmailFormData, companyId: number): Promise<void>;
}

export const emailAerisSupport: EmailAerisSupportFn = (data, companyId) => {
  const proceedEmailAerisSupport = (): ReturnType<
    typeof mgr.emailAerisSupport
  > => mgr.emailAerisSupport(data);

  return proceedEmailAerisSupport()
    .then(() => {
      notifyUser.ok(uiText('supportHistory', 'sendEmailOk'));
      mgr.reload(companyId);
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('supportHistory', 'sendEmailError');
      showAPIError(message)(error);
    });
};
