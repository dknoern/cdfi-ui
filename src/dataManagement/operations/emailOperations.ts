import { apiProcessor, performRequest } from 'tools';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import {IEmailCategory, ISendTestEmail, ISystemEmail} from "types";
import {uiStore} from "../../store";

export const getEmailCategories = (): Promise<any[]> => {
  return apiProcessor.get('emailCategories');
};

export const createEmailCategory = (
  data: IEmailCategory,
): Promise<(IEmailCategory)> => {
  const OPERATION = 'emailCategories';

  uiStore.addLoading(OPERATION);
  return apiProcessor.post(OPERATION, null, data).finally(() => {
    notifyUser.ok(uiText('categoryEmail', 'createOk'));
    uiStore.endLoading(OPERATION);
  })
};

export const deleteEmailCategory = (id: number): Promise<void> => {
  const OPERATION = 'emailCategoriesDelete';

  return apiProcessor.delete(OPERATION, id).then(() => {
    notifyUser.ok(uiText('categoryEmail', 'deleteOk'));
  }).catch((e) => {
    if(e.data.status === 500) {
      notifyUser.error(uiText('categoryEmail', 'deleteError'));
    }
  })
};

export const updateEmailCategory = (
  data?: any,
): Promise<void> => {
  const OPERATION = 'updateEmailCategory';

  uiStore.addLoading(OPERATION);
  return performRequest<void>(OPERATION, (operationName) =>
    apiProcessor.put(operationName, data?.id, {
      ...data,
    }).then((res)=> {
      if (res) {
        notifyUser.ok(uiText('categoryEmail', 'updateOk'));
      }
    }).finally(() => {
      uiStore.endLoading(OPERATION);
    }),
  );
};

export const createEmailTemplate = (data: ISystemEmail): Promise<void> => {
  return performRequest<void>('emailCreateSystemEmail', (operationName) =>
    apiProcessor.post(operationName, null, data).then((res) => {
      if (res) {
        notifyUser.ok(uiText('systemEmail', 'createOk'));
      }
    }),
  ).catch((error) => notifyUser.error(uiText('systemEmail', 'createError'))); // update this
};

export const sentTestEmail = (
  data: ISendTestEmail,
): Promise<(void)> => {
  const OPERATION = 'sendTestEmail';

  uiStore.addLoading(OPERATION);
  return apiProcessor.post(OPERATION, null, data).then((res) => {
    if (res) {
      notifyUser.ok(uiText('sentCDFIEmail', 'createOk'));
    }
  }).catch((error) => notifyUser.error(uiText('sentCDFIEmail', 'createError')))
    .finally(() => {
    uiStore.endLoading(OPERATION);
  })
};

export const sentCDFIEmail = (
  data: ISendTestEmail,
): Promise<(void)> => {
  const OPERATION = 'sendCDFIEmail';

  uiStore.addLoading(OPERATION);
  return apiProcessor.post(OPERATION, null, data).then((res) => {
    if (res) {
      notifyUser.ok(uiText('sentTestEmail', 'createOk'));
    }
  }).catch((error) => notifyUser.error(uiText('sentTestEmail', 'createError')))
    .finally(() => {
      uiStore.endLoading(OPERATION);
    })
};
