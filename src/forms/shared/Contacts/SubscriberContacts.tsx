import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { SubscriberContactEditFormData, SubscriberContact } from 'types';
import { CustomAntInput } from 'types/form';
import { SubscriberContactActionPerformer } from './types';
import { makeSubmitHandlerSubscriber, makeActionHandlersSubscriber } from './tools';
import { ViewSubscriberContact } from './View';
import { ContactEditSubscriber } from './ContactEditSubscriber';

export const SubscriberContacts: CustomAntInput<
  SubscriberContact[],
  { isCreateView?: boolean }
> = ({ value, onChange, isCreateView }) => {
  const [editingContact, setEditingContact] = useState<
    null | SubscriberContactEditFormData | undefined
  >();

  const finishContactEdit = useCallback(() => {
    setEditingContact(undefined);
  }, []);

  const onAddStart = useCallback(() => {
    setEditingContact(null);
  }, []);

  const onSubmitForm = useCallback(
    makeSubmitHandlerSubscriber({ onChange, value, editingContact, finishContactEdit }),
    [onChange, value, editingContact, finishContactEdit],
  );

  const actionHandler = useCallback<SubscriberContactActionPerformer>(
    makeActionHandlersSubscriber({ onChange, setEditingContact }),
    [onChange],
  );

  return (
    <>
      <ContactEditSubscriber
        data={editingContact}
        onFinish={onSubmitForm}
        onCancel={finishContactEdit}
      />
      <Button
        onClick={onAddStart}
        style={{ float: 'right', marginTop: '-40px' }}
        type="primary"
        size="middle"
      >
        Add user
      </Button>
      <ViewSubscriberContact
        value={value ?? []}
        handleAction={actionHandler}
        isCreateView={isCreateView}
      />
    </>
  );
};
