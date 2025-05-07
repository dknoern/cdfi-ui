import React, { FC, useCallback } from 'react';
import { VoidFn, SubscriberContactEditFormData, PersonRole } from 'types';
import { ModalWithForm } from 'modals';
import {
  updateSubscriberContact,
  createSubscriberContact,
} from './tools/operations';
import { subscriberStore } from 'store';
import { SubscriberContactEditForm } from 'forms/SubscriberContactEdit';

type SubscriberContactEditProps = {
  data: SubscriberContactEditFormData | null | undefined;
  onFinish: VoidFn;
  onCancel: VoidFn;
};

export const SubscriberContactEdit: FC<SubscriberContactEditProps> = ({
  data,
  onFinish,
  onCancel,
}) => {
  const subscriberId = subscriberStore.subscriberId ?  subscriberStore.subscriberId: 1;

  const saveHandler = useCallback(
    (values: SubscriberContactEditFormData) => {
      if (!data) return;
      const proceedSave = data?.firstName
        ? (): ReturnType<typeof updateSubscriberContact> =>
            updateSubscriberContact(subscriberId, data.id, {...values, uploadReminders: false})
        : (): ReturnType<typeof createSubscriberContact> =>
            createSubscriberContact(subscriberId, {
              ...values,
              role: PersonRole.ANALYST,
              uploadReminders: false
            });

      proceedSave().then(onFinish);
    },
    [onFinish, onCancel, data],
  );

  const FORM_ID = data?.firstName ? 'CONTACT_EDIT' : 'CONTACT_CREATE';

  return (
    <ModalWithForm
      visible={data !== undefined}
      onCancel={onCancel}
      formId={FORM_ID}
      forceRender={false}
      title={
        data?.firstName
          ? 'Update Subscriber Contact'
          : 'Create New Subscriber Contact'
      }
      actionButtonText={data?.firstName ? 'Update' : 'Save'}
    >
      {!!data !== undefined && (
        <SubscriberContactEditForm
          initialValues={data ?? {}}
          onFinish={saveHandler}
          formId={FORM_ID}
        />
      )}
    </ModalWithForm>
  );
};
