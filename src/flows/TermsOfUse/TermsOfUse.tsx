import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { PlainTextModalFlow } from 'types/plainTextModal';
import { PlainTextModal } from 'modals/PlainTextModal';
import { userStore } from 'store';
import { onLinkClick, hideWindow } from './tools';
import { makeFooter } from './makeFooter';

const FLOW_NAME = 'termsOfUse' as PlainTextModalFlow;

const TermsOfUseFn: FC = () => {
  const isTermsOfUseAccepted =
    userStore.isAerisAdmin || userStore.isTermsOfUseAccepted;

  const handleCancel = useCallback(() => {
    if (isTermsOfUseAccepted) hideWindow();
  }, [isTermsOfUseAccepted]);

  const footer = useMemo(
    () =>
      makeFooter({
        termsAccepted: isTermsOfUseAccepted,
      }),
    [isTermsOfUseAccepted],
  );

  return (
    <PlainTextModal
      flowName={FLOW_NAME}
      onCancel={handleCancel}
      onLinkClick={onLinkClick}
      footer={footer}
      closable={userStore.isTermsOfUseAccepted}
    />
  );
};

export const TermsOfUse = observer(TermsOfUseFn);
