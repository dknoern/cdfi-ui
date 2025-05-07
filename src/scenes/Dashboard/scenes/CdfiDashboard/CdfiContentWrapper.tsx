import React, { FC } from 'react';
import { WithCompanyTypeProps } from './types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { CdfiDashboard } from './CdfiDashboard';
import { SubscriberDashboard } from './SubscriberDashboard';
import { AnalystDashboard } from './AnalystDashboard';
import { OrganizationDetails } from './OrganizationDetails';
import { RatingsDashboard } from './RatingsDashboard';
import { ManageCdfis } from 'components/ManageCdfis/ManageCdfis';
import { FinancialsDashboard } from './FinancialsDashboard';
import { SupplementalDashboard } from './SupplementalDashboard';
import { MetricsMapper } from './MetricsMapper';
import { Metrics } from './Metrics';
import { ContactsDashboard } from './ContactsDashboard';
import { AerisGlobalLibrary } from '../../../Library/GlobalLibrary';
import { EditDataWebform } from '../AdminDashboard/EditDataWebform';
import { Graphs } from './Graphs';
import { SupportHistoryDashboard } from 'scenes/SupportHistory';
import { Periods } from './Periods';
import { RequiredMetrics } from './RequiredMetrics';

export const CdfiContentWrapper: FC<WithCompanyTypeProps> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {
        <>
          <Route path={`${path}`} exact component={CdfiDashboard} />
          <Route path={`${path}/analysts`} component={AnalystDashboard} />
          <Route path={`${path}/contacts`} component={ContactsDashboard} />
          <Route path={`${path}/edit-data/:year/:quarter`} component={EditDataWebform} />
          <Route path={`${path}/financials`} component={FinancialsDashboard} />
          <Route path={`${path}/graphs`} component={Graphs} />
          <Route path={`${path}/library`} component={AerisGlobalLibrary} />
          <Route path={`${path}/mapper/:year/:quarter/:dataset`} component={MetricsMapper} />
          <Route path={`${path}/metrics`} component={Metrics} />
          <Route path={`${path}/org-details`} component={OrganizationDetails} />
          <Route path={`${path}/periods`} component={Periods} />
          <Route path={`${path}/ratings`} component={RatingsDashboard} />
          <Route path={`${path}/required-metrics`} component={RequiredMetrics} />
          <Route path={`${path}/subscribers`} component={SubscriberDashboard} />
          <Route path={`${path}/supplemental`} component={SupplementalDashboard} />
          <Route path={`${path}/support-history`} component={SupportHistoryDashboard} />
          <Route path={`${path}/update-cdfi`} component={ManageCdfis} />
        </>
      }
    </Switch>
  );
};
