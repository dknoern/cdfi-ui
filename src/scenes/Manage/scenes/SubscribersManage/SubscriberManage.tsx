import React, { FC } from 'react';
import { userStore } from 'store';
import { subscriberStore } from 'store';
import { SubscriberContentWrapper } from 'scenes/Dashboard/scenes/SubscriberDashboard/SubscriberContentWrapper';

export const SubscriberManage: FC = () => {
  const { subscriberId } = subscriberStore;

  return (
    <SubscriberContentWrapper
      companyType={userStore.info.companyType}
      subscriberId={subscriberId}
    />
  );
};
