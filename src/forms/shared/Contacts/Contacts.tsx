import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { CdfiContact, CdfiContactEditFormData } from 'types';
import { CustomAntInput } from 'types/form';
import { CdfiContactActionPerformer } from './types';
import { makeActionHandlers, makeSubmitHandler } from './tools';
import { View } from './View';
import { ContactEdit } from './ContactEdit';

export const Contacts: CustomAntInput<
  CdfiContact[],
  { isCreateView?: boolean }
> = ({ value, onChange, isCreateView }) => {
  const [editingContact, setEditingContact] = useState<
    null | CdfiContactEditFormData | undefined
  >();

  const finishContactEdit = useCallback(() => {
    setEditingContact(undefined);
  }, []);

  const onAddStart = useCallback(() => {
    setEditingContact(null);
  }, []);

  const onSubmitForm = useCallback(
    makeSubmitHandler({ onChange, value, editingContact, finishContactEdit }),
    [onChange, value, editingContact, finishContactEdit],
  );

  const actionHandler = useCallback<CdfiContactActionPerformer>(
    makeActionHandlers({ onChange, setEditingContact }),
    [onChange],
  );

  return (
    <>
      <ContactEdit
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
        Add Contact
      </Button>
      <View
        value={value ?? []}
        handleAction={actionHandler}
        isCreateView={isCreateView}
      />
    </>
  );
};
