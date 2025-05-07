import React, { FC } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import { userStore } from 'store';
import { GlobalOrCdfiMetrics } from './GlobalMetrics';

export const Metrics: FC = () => {
  const { isFM } = userStore;
  const { path } = useRouteMatch();

  return (
    <Switch>
      {!isFM && <Route path={path} component={GlobalOrCdfiMetrics} />}
    </Switch>
  );
};
