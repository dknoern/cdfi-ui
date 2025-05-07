import React, { FC, useCallback } from 'react';
import { VoidFn, CdfiContactEditFormData, PersonRole } from 'types';
import { ModalWithForm } from 'modals';
import { CdfiContactEditForm } from 'forms';
import { updateCdfiContact, createCdfiContact } from './tools/operations';
import { cdfiStore } from 'store';

type CdfiContactEditProps = {
  data: CdfiContactEditFormData | null | undefined;
  onFinish: VoidFn;
  onCancel: VoidFn;
};

export const CdfiContactEdit: FC<CdfiContactEditProps> = ({
  data,
  onFinish,
  onCancel,
}) => {
  const { cdfiId } = cdfiStore;

  const saveHandler = useCallback(
    (values: CdfiContactEditFormData) => {
      if (!data) return;
      const proceedSave = data?.firstName
        ? (): ReturnType<typeof updateCdfiContact> =>
            updateCdfiContact(cdfiId, data.id, values)
        : (): ReturnType<typeof createCdfiContact> =>
            createCdfiContact(cdfiId, {
              ...values,
              role: PersonRole.ANALYST,
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
        data?.firstName ? 'Update CDFI Contact' : 'Create New CDFI Contact'
      }
      actionButtonText={data?.firstName ? 'Update' : 'Save'}
    >
      {!!data !== undefined && (
        <CdfiContactEditForm
          initialValues={data ?? {}}
          onFinish={saveHandler}
          formId={FORM_ID}
        />
      )}
    </ModalWithForm>
  );
};
