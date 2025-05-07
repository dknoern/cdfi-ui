import React, { FC } from 'react';
import { VoidFn, CdfiContactEditFormData } from 'types';
import { ModalWithForm } from 'modals';
import { CdfiContactEditForm } from 'forms';

type ContactEditProps = {
  data: CdfiContactEditFormData | null | undefined;
  onFinish: (values: CdfiContactEditFormData) => void;
  onCancel: VoidFn;
};

export const ContactEdit: FC<ContactEditProps> = ({
  data,
  onFinish,
  onCancel,
}) => {

  const FORM_ID = data?.firstName ? 'CONTACT_EDIT_CREATE_CDFI' : 'CONTACT_CREATE_CREATE_CDFI';

  return (
    <ModalWithForm
      visible={data !== undefined}
      onCancel={onCancel}
      formId={FORM_ID}
      forceRender={false}
      title={data?.firstName ? 'Edit CDFI Contact' : 'Create New CDFI Contact'}
      actionButtonText={data?.firstName ? 'Update' : 'Save'}
    >
      {!!data !== undefined && (
        <CdfiContactEditForm initialValues={data ?? {}} onFinish={onFinish} formId={FORM_ID} />
      )}
    </ModalWithForm>
  );
};
