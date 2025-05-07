import React, { FC } from 'react';
import { VoidFn, SubscriberContactEditFormData } from 'types';
import { ModalWithForm } from 'modals';
import { ContactEditSubscriber as Form } from 'forms';

const FORM_ID = 'CONTACT_EDIT';

type ContactEditSubscriberProps = {
  data: SubscriberContactEditFormData | null | undefined;
  onFinish: (values: SubscriberContactEditFormData) => void;
  onCancel: VoidFn;
};

export const ContactEditSubscriber: FC<ContactEditSubscriberProps> = ({
  data,
  onFinish,
  onCancel,
}) => {
  return (
    <ModalWithForm
      visible={data !== undefined}
      onCancel={onCancel}
      formId={FORM_ID}
      forceRender={false}
      title={data?.firstName ? 'Edit Subscriber Contact' : 'Create New Subscriber Contact'}
      actionButtonText={data?.firstName ? 'Update' : 'Save'}
    >
      {!!data !== undefined && (
        <Form initialValues={data ?? {}} onFinish={onFinish} formId={FORM_ID} />
      )}
    </ModalWithForm>
  );
};
