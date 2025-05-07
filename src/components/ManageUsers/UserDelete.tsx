import { FC, useEffect } from 'react';
import { User, VoidFn } from 'types';
import { deleteUsers } from './tools';

type UserDeleteProps = {
  userIds: User['id'][] | null;
  onFinish: VoidFn;
  onCancel: VoidFn;
};

export const UserDelete: FC<UserDeleteProps> = ({ userIds, onFinish }) => {
  useEffect(() => {
    if (!userIds) return;

    deleteUsers(userIds).then(onFinish);
  }, [onFinish, userIds]);

  return null;
};
