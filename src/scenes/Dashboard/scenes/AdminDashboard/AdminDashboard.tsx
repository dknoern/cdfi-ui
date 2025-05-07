import React, { FC } from 'react';
import {
  withRouter,
  RouteComponentProps,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { GlobalDashboard } from './scenes';

export const AdminDashboardFn: FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.path}/fundmanager/:fundManagerId`}
        to="/users/fundmanager/:fundManagerId"
      />
      <Route exact path={match.path} component={GlobalDashboard} />
    </Switch>
  );
};

export const AdminDashboard = withRouter(AdminDashboardFn);
