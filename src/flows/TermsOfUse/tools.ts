import { VoidFn } from 'types';
import {
  PlainTextModalFlow,
  ProcessDocumentResponse,
} from 'types/plainTextModal';
import { typography } from 'constants/typography';
import { uiText } from 'constants/uiText';
import { apiProcessor, authTools, Dialog, showAPIError } from 'tools';
import { uiStore, userStore } from 'store';

const FLOW_NAME = 'termsOfUse' as PlainTextModalFlow;

const { yes, no } = typography('common');

export const hideWindow = (): void => {
  uiStore.deactivateFlow(FLOW_NAME);
};

export const showTermsOfUseRejectionWarning = ({
  onOk,
  onCancel,
}: {
  onOk: (close: VoidFn) => void;
  onCancel?: VoidFn;
}): void => {
  const { titleRejection, textRejection } = typography('termsOfUse');

  Dialog.confirm({
    title: titleRejection,
    content: textRejection,
    okText: yes,
    onOk,
    cancelText: no,
    onCancel: (close) => {
      if (onCancel) onCancel();
      // Type checking is required due to crash on Esc press
      if (typeof close === 'function') close();
    },
  });
};

export const onLinkClick = (
  event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
): void => {
  if ('getAttribute' in event.target)
    if (
      (event.target as Element)
        .getAttribute('href')
        ?.toLocaleLowerCase()
        .includes('privacypolicy')
    ) {
      event.preventDefault();
      uiStore.activateFlow('privacyPolicy');
    }
};

const proceedTermsAcceptance = (
  isAccepted: boolean,
): Promise<ProcessDocumentResponse> => {
  return apiProcessor.patch('termsOfUse', null, { isAccepted });
};

const process = (isAccepted: boolean): Promise<void> => {
  uiStore.addLoading(FLOW_NAME);

  return proceedTermsAcceptance(isAccepted)
    .then(({ token }) => {
      authTools.storeUserInfo(token);
      userStore.setToken(token);
    })
    .catch(
      showAPIError(
        uiText(FLOW_NAME, isAccepted ? 'acceptError' : 'rejectError'),
      ),
    )
    .finally(() => {
      uiStore.endLoading(FLOW_NAME);
    });
};

export const accept = (): Promise<void> => {
  return process(true)
    .then(hideWindow)
    .catch(showAPIError(uiText(FLOW_NAME, 'acceptError')));
};

export const reject = (): Promise<void> => {
  return process(false)
    .then(hideWindow)
    .catch(showAPIError(uiText(FLOW_NAME, 'rejectError')));
};
