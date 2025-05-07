import React, { FC } from 'react';
import { WithCompanyTypeProps } from './types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { SubscriberDashboard } from './SubscriberDashboard';
import { SubscriberContacts } from './SubscriberContacts';
import { SubscriberOrganizationDetails } from './SubscriberOrganizationDetails';
import { ManageSubscribers } from 'components';
import { SubscriberSubscriptions } from './SubscriberSubscriptions';
import { MyCdfis } from '../Subscribers/MyCdfis';
import { SupportHistoryDashboard } from 'scenes/SupportHistory';
import { AccountSummary } from '../../../AccountSummary';

export const SubscriberContentWrapper: FC<WithCompanyTypeProps> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {
        <>
          <Route path={`${path}`} exact component={SubscriberDashboard} />
          <Route path={`${path}/account_summary`} component={AccountSummary} />
          <Route path={`${path}/cdfis`} component={MyCdfis} />
          <Route path={`${path}/contacts`} component={SubscriberContacts} />
          <Route path={`${path}/org-details`} component={SubscriberOrganizationDetails} />
          <Route path={`${path}/subscriptions`} component={SubscriberSubscriptions} />
          <Route path={`${path}/support-history`} component={SupportHistoryDashboard} />
          <Route path={`${path}/update-subscriber`} component={ManageSubscribers} />
        </>
      }
    </Switch>
  );
};
