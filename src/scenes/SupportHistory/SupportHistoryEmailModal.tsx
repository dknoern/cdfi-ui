import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { ModalWithForm } from 'modals';
import { MODAL_WIDTH } from 'constants/ui';
import { SupportHistoryEmailForm } from './SupportHistoryEmailForm';
import { emailAerisSupport } from './tools';
import { FormInstance } from 'antd/lib/form';
import { userStore } from 'store';

type SupportHistoryEmailModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  formId: string;
  form: FormInstance;
};

export const SupportHistoryEmailModal: FC<SupportHistoryEmailModalProps> = ({
  visible,
  onClose,
  onFinish,
  formId,
  form,
}) => {
  const onSendEmail = useCallback(
    (values: any) => {
      const proceedEmailAerisSupport = (): ReturnType<
        typeof emailAerisSupport
      > => emailAerisSupport(values, userStore.companyId);
      proceedEmailAerisSupport().then(onFinish);
      form.resetFields();
    },
    [onFinish],
  );

  return (
    <ModalWithForm
      formId={formId}
      title={'Email Aeris Support'}
      visible={visible}
      onCancel={onClose}
      actionButtonText={'Send Email'}
      width={MODAL_WIDTH.MEDIUM}
    >
      <SupportHistoryEmailForm
        formId={formId}
        onFinish={onSendEmail}
        form={form}
      ></SupportHistoryEmailForm>
    </ModalWithForm>
  );
};
