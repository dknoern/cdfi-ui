import React, { FC } from 'react';
import { VoidFn } from 'types';
import { ModalWithForm } from 'modals';
import {
  SupportRequestSubjectsEditForm,
  SupportRequestSubjectsFormData as SupportRequestSubjectsFormData,
} from './SupportRequestSubjectsEditForm';
import { MODAL_WIDTH } from 'constants/ui';
import { Form } from 'antd';
import { updateSupportRequestSubject } from './tools';

type SupportRequestSubjectsEditValueModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  formId: string;
  subjectFieldValue: string;
  setSubjectFieldValue: (value: any) => void;
  supportRequestEditId: number;
};

export const SupportRequestSubjectsEditValueModal: FC<
  SupportRequestSubjectsEditValueModalProps
> = ({
  visible,
  onClose,
  onFinish,
  formId,
  subjectFieldValue,
  setSubjectFieldValue,
  supportRequestEditId,
}) => {
  const [form] = Form.useForm();

  const onCloseEditValue = () => {
    form.resetFields();
    setSubjectFieldValue(undefined);
    onClose();
  };

  const onFinishEditValue = () => {
    const proceedSave = (): ReturnType<typeof updateSupportRequestSubject> =>
      updateSupportRequestSubject(supportRequestEditId, {
        subject: form.getFieldValue('subject'),
        isEnabled: true,
      });

    proceedSave().then(() => {
      onFinish();
    });

    form.resetFields();
    setSubjectFieldValue(undefined);
  };

  return (
    <ModalWithForm
      formId={formId}
      title={'Edit Support Request Subject'}
      visible={visible}
      onCancel={onCloseEditValue}
      actionButtonText={'Save'}
      width={MODAL_WIDTH.SMALL}
    >
      <SupportRequestSubjectsEditForm
        formId={formId}
        onFinish={onFinishEditValue}
        form={form}
        initialValues={{ subject: subjectFieldValue }}
      ></SupportRequestSubjectsEditForm>
    </ModalWithForm>
  );
};
