import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { SubscribersManage } from '../Subscribers/scenes/SubscribersManage';

export const Subscribers: FC = () => {
  const match = useRouteMatch('/subscribers');

  return (
    <Switch>
      <Route path={`${match?.path}`} component={SubscribersManage} />
    </Switch>
  );
};
