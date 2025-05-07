import React, { FC, useCallback, useState } from 'react';
import { User } from 'types';
import { useCompanyUsersByCompanyType } from 'dataManagement';
import { EditableUser, WithFMIdAndCompanyTypeProps } from './types';
import { userCreateDefaultValues } from './constants';
import { UsersList } from './UsersList';
import { UserDelete } from './UserDelete';
import { UserEdit } from './UserEdit';

export const ManageUsers: FC<WithFMIdAndCompanyTypeProps> = ({ fmId, companyType }) => {
  const { data, isLoading, reload } = useCompanyUsersByCompanyType(companyType);

  const [userEditData, setUserEditData] = useState<EditableUser | null>(null);
  const [deleteUserIds, setDeleteUserIds] = useState<User['id'][] | null>(null);
  const [selected, setSelected] = useState<React.Key[]>([]);

  const startAdd = useCallback(() => {
    setUserEditData({
      ...userCreateDefaultValues,
    });
  }, []);

  const startEdit = useCallback(
    (userId) => {
      if (!data) return;

      setUserEditData(data.find((item) => item.id === userId) as EditableUser);
    },
    [data],
  );

  const startDelete = useCallback(
    (userIds) => {
      if (!data) return;

      setDeleteUserIds(userIds);
    },
    [data],
  );

  const onFinishEdit = useCallback(() => {
    setUserEditData(null);
    setSelected([]);
    reload();
  }, [reload]);

  const onCancelEdit = useCallback(() => {
    setUserEditData(null);
  }, []);

  const onFinishDelete = useCallback(() => {
    setDeleteUserIds(null);
    reload();
  }, [reload]);

  const onCancelDelete = useCallback(() => {
    setDeleteUserIds(null);
  }, []);
  return (
    <>
      <UsersList
        isLoading={isLoading}
        users={data ?? []}
        onStartAdd={startAdd}
        onStartEdit={startEdit}
        onStartDelete={startDelete}
        selected={selected}
        setSelected={setSelected}
      />
      <UserEdit
        companyId={fmId}
        companyType={companyType}
        data={userEditData}
        onFinish={onFinishEdit}
        onCancel={onCancelEdit}
      />
      <UserDelete
        userIds={deleteUserIds}
        onFinish={onFinishDelete}
        onCancel={onCancelDelete}
      />
    </>
  );
};
