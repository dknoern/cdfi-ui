import React, { FC } from 'react';
import { SubscribersContentWrapper } from '../../../Dashboard/scenes/Subscribers/SubscribersContentWrapper';
import { userStore } from 'store';

export const SubscribersManage: FC = () => {
  return <SubscribersContentWrapper companyType={userStore.info.companyType} />;
};
