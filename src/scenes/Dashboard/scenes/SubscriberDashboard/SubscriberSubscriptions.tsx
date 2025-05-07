import React, { FC } from 'react';
import { WithCompanyTypeProps } from '../CdfiDashboard/types';
import { PageSectionWrapper } from 'components';
import {
  useSubscriberSubscriptions,
  useSubscribers,
} from 'dataManagement';
import { subscriberStore } from 'store';
import { SubscriberSubscriptionsTable } from './SubscriberSubscriptionsTable';

export const SubscriberSubscriptions: FC<WithCompanyTypeProps> = () => {
  const { data: subscribers } = useSubscribers();
  const { subscriberId } = subscriberStore;
  const subscriberName = subscribers?.find((item) =>
    item.id == subscriberId ? item.name : '',
  )?.name;

  const { data: subscriberSubscriptions } =
    useSubscriberSubscriptions(subscriberId);

  return (
    <>
      <PageSectionWrapper topTitle={subscriberName} title="">
        <SubscriberSubscriptionsTable data={subscriberSubscriptions?.subscriberSubscriptions}/>
      </PageSectionWrapper>
    </>
  );
};
