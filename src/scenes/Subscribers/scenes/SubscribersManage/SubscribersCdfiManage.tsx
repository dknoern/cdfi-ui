import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { OrganizationDetails } from 'scenes/Dashboard/scenes/CdfiDashboard/OrganizationDetails';
import { FinancialsDashboard } from 'scenes/Dashboard/scenes/CdfiDashboard/FinancialsDashboard';
import { AerisGlobalLibrary } from 'scenes/Library/GlobalLibrary';
import { AerisExplorer } from 'scenes/AerisExplorer';

export const SubscribersCdfiManage: FC = () => {
  const match = useRouteMatch('/cdfi');

  return (
    <Switch>
      <Route path={`${match?.path}/:id`} component={OrganizationDetails} exact />
      <Route
        path={`${match?.path}/:id/performance-maps`}
        component={FinancialsDashboard} exact
      />
      <Route path={`${match?.path}/:id/library`} component={AerisGlobalLibrary} exact />
    </Switch>
  );
};
