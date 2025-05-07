import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ManageUsers } from 'components/ManageUsers';
import { CompanyType } from 'types';

export const Users: FC = () => {
  const { fundManagerId } = useParams<{ fundManagerId: string }>();

  return <ManageUsers fmId={Number(fundManagerId)} companyType={CompanyType.CARS}/>;
};
