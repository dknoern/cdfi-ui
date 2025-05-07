import {
  ProcessDocumentResponse,
} from 'types/plainTextModal';
import { uiText } from 'constants/uiText';
import { apiProcessor, authTools, showAPIError } from 'tools';
import { uiStore, userStore } from 'store';

const FLOW_NAME = 'impersonateUser';

const proceedImpersonate = (
  userId: number,
): Promise<ProcessDocumentResponse> => {
  return apiProcessor.post('impersonate', userId);
};

export const processImpersonate = (userId: number, history: any): Promise<void> => {
  uiStore.addLoading(FLOW_NAME);

  return proceedImpersonate(userId)
    .then(({ token }) => {
      authTools.storeUserInfo(token);
      userStore.setToken(token);
    })
    .catch(
      showAPIError(
        uiText(FLOW_NAME, 'impersonateUserError'),
      ),
    )
    .finally(() => {
      uiStore.endLoading(FLOW_NAME);
      history.push('/dashboard');
      window.location.reload();
    });
};

const proceedUnImpersonate = (
  userId: number,
): Promise<ProcessDocumentResponse> => {
  return apiProcessor.post('unImpersonate', userId);
};

export const processUnImpersonate = (userId: number, history: any): Promise<void> => {
  uiStore.addLoading(FLOW_NAME);

  return proceedUnImpersonate(userId)
    .then(({ token }) => {
      authTools.storeUserInfo(token);
      userStore.setToken(token);
    })
    .catch(
      showAPIError(
        uiText(FLOW_NAME, 'unImpersonateUserError'),
      ),
    )
    .finally(() => {
      uiStore.endLoading(FLOW_NAME);
      history.push('/dashboard');
      window.location.reload();
    });
};