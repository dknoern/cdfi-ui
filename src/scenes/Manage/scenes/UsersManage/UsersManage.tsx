import React, { FC } from 'react';
import { ManageUsers } from 'components/ManageUsers';
import { userStore } from 'store';
import { CompanyType } from 'types';

export const UsersManage: FC = () => {
  return <ManageUsers fmId={userStore.info.companyId} companyType={CompanyType.CARS}/>;
};
