import React, { FC, useCallback } from 'react';
import { Company, User, UserEditFormData, VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { Dialog, authTools } from 'tools';
import { userStore } from 'store';
import { UserEdit as UserEditForm } from 'forms/AdminForms';
import { ModalWithForm } from 'modals';
import { saveUser } from './tools';
import { EditableUser } from './types';

type UserEditProps = {
  data: (EditableUser & { id?: User['id'] }) | null;
  companyId: Company['id'];
  onFinish: VoidFn;
  onCancel: VoidFn;
  companyType: Company['type']
};

export const UserEdit: FC<UserEditProps> = ({
  data,
  onFinish,
  onCancel,
  companyId,
  companyType
}) => {
  const saveHandler = useCallback(
    (values: UserEditFormData) => {
      if (!data) return;

      const proceedSave = (): ReturnType<typeof saveUser> =>
        saveUser(companyId, data.id || null, values);

      const itIsMe = data.id && userStore.info.userId === data.id;

      if (itIsMe) {
        Dialog.confirm({
          title: uiText('users', 'confirmEditSelfTitle'),
          content: uiText('users', 'confirmEditSelfText'),
          onOk: () => proceedSave().then(authTools.logout),
          onCancel,
        });
      } else {
        proceedSave().then(onFinish);
      }
    },
    [onFinish, onCancel, companyId, data],
  );

  const FORM_ID = data?.firstName ? 'userEditForm' : 'userCreateForm';

  return (
    <ModalWithForm
      visible={!!data}
      onCancel={onCancel}
      formId={FORM_ID}
      title={data?.firstName ? 'Edit User' : 'Create User'}
      actionButtonText={data?.firstName ? 'Update' : 'Create'}
    >
      {!!data && (
        <UserEditForm
          initialValues={data}
          onFinish={saveHandler}
          formId={FORM_ID}
          companyId={companyId}
          companyType={companyType}
        />
      )}
    </ModalWithForm>
  );
};
