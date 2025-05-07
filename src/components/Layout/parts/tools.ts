import { PlainTextModalFlow } from 'types/plainTextModal';
import { uiStore } from 'store';
import { UI_STORE_FLOW_NAME as CONTACT_SUPPORT_FLOW_NAME } from '../../ContactSupport';

export const activateTermsOfServiceFlow = (): void => {
  uiStore.activateFlow('termsOfUse' as PlainTextModalFlow);
};

export const activateContactSupportFlow = (): void => {
  uiStore.activateFlow(CONTACT_SUPPORT_FLOW_NAME);
};

export const activatePrivacyFlow = (): void => {
  uiStore.activateFlow('privacyPolicy' as PlainTextModalFlow);
};
