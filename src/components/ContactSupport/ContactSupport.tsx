import React, { FC, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { VoidFn } from 'types';
import { FormData, FlowState, FormDataNotLogged } from 'types/contactSupport';
import { MODAL_WIDTH } from 'constants/ui';
import { typography } from 'constants/typography';
import { showAPIError } from 'tools';
import { dataMan } from 'dataManagement/managers';
import { uiStore, userStore } from 'store';
import { ModalWithForm } from 'modals';
import { ContactSupportResultModal } from 'components/ContactSupport/ContactSupportResultModal';
import { ContactSupportForm } from './ContactSupportForm';
import { formId, UI_STORE_FLOW_NAME } from './constants';

const mgr = dataMan.managers.feedback;

const { modalTitle } = typography('requestSupport');

const hideWindow = (): void => {
  uiStore.deactivateFlow(UI_STORE_FLOW_NAME);
};

const ContactSupportFn: FC = () => {
  const [flowState, setFlowState] = useState<FlowState>('IDLE');
  const [requestId, setRequestId] = useState<string>();

  const finishFlow = useCallback<VoidFn>(() => {
    setRequestId(undefined);
    setFlowState('IDLE');
    hideWindow();
  }, []);

  const proceedRequest = useCallback<(formData: FormData) => void>(
    (formData) => {
      setFlowState('PROCESSING');

      // TODO: accountId for future
      const data2send = { ...formData };
      delete data2send.accountId;

      mgr
        .createSupportRequest(
          userStore.isLogged
            ? Object.assign({ userId: userStore.info.userId }, data2send)
            : (data2send as FormDataNotLogged),
        )
        .then((result) => {
          setRequestId(result.requestId);
          setFlowState('CODE_RECEIVED');
        })
        .catch((e) => {
          showAPIError('contactSupport', 'requestError')(e);
          setFlowState('IDLE');
        });
    },
    [],
  );

  if (flowState === 'CODE_RECEIVED' && requestId) {
    return (
      <ContactSupportResultModal
        visible
        onCancel={finishFlow}
        requestId={requestId}
      />
    );
  }

  return (
    <ModalWithForm
      formId={formId}
      width={MODAL_WIDTH.SMALL}
      title={modalTitle}
      visible={uiStore.activeFlows.has(UI_STORE_FLOW_NAME)}
      onCancel={hideWindow}
      forceRender={false}
    >
      <ContactSupportForm
        onFinish={proceedRequest}
        userInfo={
          userStore.isLogged
            ? {
                name: userStore.info.name,
                surname: userStore.info.surname,
                email: userStore.info.email,
              }
            : undefined
        }
      />
    </ModalWithForm>
  );
};

export const ContactSupport = observer(ContactSupportFn);
