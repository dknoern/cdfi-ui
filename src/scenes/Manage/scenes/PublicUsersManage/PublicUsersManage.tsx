import React, { FC } from 'react';
import { CompanyType } from 'types';
import { SubscriberContacts } from '../../../Dashboard/scenes/SubscriberDashboard/SubscriberContacts';

export const PublicUsersManage: FC = () => {

  return (
    <SubscriberContacts
      companyType={CompanyType.INVESTOR}
      subscriberId={1}
    />
  );
};
