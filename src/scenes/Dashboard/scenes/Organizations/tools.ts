import {
  Cdfi,
  CdfiEditFormData,
  Subscriber,
  SubscriberEditFormData,
} from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { CdfiManager } from 'dataManagement/managers/CdfiManager';
import { SubscriberManager } from 'dataManagement/managers/SubscriberManager';

const mgrCdfi = dataMan.manager(ManagerName.cdfis) as CdfiManager;

interface SaveFnCdfi {
  (
    cdfiId: Cdfi['id'] | null,
    data: CdfiEditFormData,
    isEditForm: boolean,
  ): Promise<void>;
}

export const saveCdfi: SaveFnCdfi = (cdfiId, data, isEditForm) => {
  const proceedSave = isEditForm
    ? (): ReturnType<typeof mgrCdfi.updateCdfi> => mgrCdfi.updateCdfi(cdfiId, data)
    : (): ReturnType<typeof mgrCdfi.createCdfi> => mgrCdfi.createCdfi(data); 

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('cdfis', cdfiId ? 'updateOk' : 'createOk'));
      mgrCdfi.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('cdfis', cdfiId ? 'updateError' : 'createError');
      showAPIError(message)(error);
    });
};

const mgrSubscriber = dataMan.manager(
  ManagerName.subscribers,
) as SubscriberManager;

interface SaveFnSubscriber {
  (
    cdfiId: Subscriber['id'] | null,
    data: SubscriberEditFormData,
    isEditForm: boolean,
  ): Promise<void>;
}

export const saveSubscriber: SaveFnSubscriber = (
  subscriberId,
  data,
  isEditForm,
) => {
  const hideActivityVal = data.hideActivity ? true : false;
  const reportAllRowsVal = data.reportAllRows ? true : false;
  const isActiveVal = data.isActive ? true : false;

  const transformedData = {
    ...data,
    hideActivity: hideActivityVal,
    reportAllRows: reportAllRowsVal,
    isActive: isActiveVal,
  };;

  const proceedSave = isEditForm
    ? (): ReturnType<typeof mgrSubscriber.updateSubscriber> => mgrSubscriber.updateSubscriber(subscriberId, transformedData) 
    : (): ReturnType<typeof mgrSubscriber.createSubscriber> => mgrSubscriber.createSubscriber(transformedData); 

  return proceedSave()
    .then(() => {
      notifyUser.ok(
        uiText('subscribers', subscriberId ? 'updateOk' : 'createOk'),
      );
      mgrSubscriber.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subscribers', subscriberId ? 'updateError' : 'createError');
      showAPIError(message)(error);
    });
};


