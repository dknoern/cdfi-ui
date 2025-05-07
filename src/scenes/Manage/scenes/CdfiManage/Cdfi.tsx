import React, { FC } from 'react';
import { cdfiStore, userStore } from 'store';
import { Redirect, useParams } from 'react-router-dom';
import { CdfiContentWrapper } from '../../../Dashboard/scenes/CdfiDashboard/CdfiContentWrapper';

export const Cdfi: FC = () => {
  const { id } = useParams();
  const { cdfiId } = cdfiStore;

  if (+id !== userStore.companyId) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <CdfiContentWrapper
      companyType={userStore.info.companyType}
      cdfiId={cdfiId}
      cdfiName=""
    />
  );
};
