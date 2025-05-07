import React, { FC } from 'react';
import { PlainTextModalFlow } from 'types/plainTextModal';
import { PlainTextModal } from 'modals/PlainTextModal';
import { uiStore } from 'store';
import { onLinkClick } from './tools';

const FLOW_NAME = 'privacyPolicy' as PlainTextModalFlow;

const handleCancel = (): void => {
  uiStore.deactivateFlow(FLOW_NAME);
};

export const PrivacyPolicy: FC = () => {
  return (
    <PlainTextModal
      flowName={FLOW_NAME}
      onCancel={handleCancel}
      onLinkClick={onLinkClick}
    />
  );
};
