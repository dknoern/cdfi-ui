import React, { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { userStore } from 'store';
import {
  Mapper,
  UsersManage,
  Usage,
  CdfiManage,
  OrganizationsManage,
  AllUsersManage,
  AllOrganizationsManage,
  PublicUsersManage,
} from './scenes';
import { SubscriberManage } from './scenes/SubscribersManage';

export const Manage: FC = () => {
  const match = useRouteMatch('/manage');

  if (
    !(
      userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor || userStore.isAerisAnalyst || userStore.isSubscriber
    )
  )
    return null;

  if (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) {
    return (
      <Switch>
        <Route path={`${match?.path}/all-organizations`} component={AllOrganizationsManage} />
        <Route path={`${match?.path}/all-users`} component={AllUsersManage} />
        <Route path={`${match?.path}/cdfi/:id`} component={CdfiManage} />
        <Route path={`${match?.path}/mapper`} component={Mapper} />
        <Route path={`${match?.path}/organizations`} component={OrganizationsManage} />
        <Route path={`${match?.path}/public-users`} component={PublicUsersManage} />
        <Route path={`${match?.path}/subscriber/:id`} component={SubscriberManage} />
        <Route path={`${match?.path}/usage`} component={Usage} />
        <Route path={`${match?.path}/users`} component={UsersManage} />
      </Switch>
    );
  }
  // User is Aeris Analyst
  return (
    <Switch>
      <Route path={`${match?.path}/cdfi/:id`} component={CdfiManage} />
      <Route path={`${match?.path}/organizations`} component={OrganizationsManage} />
      <Route path={`${match?.path}/subscriber/:id`} component={SubscriberManage} />
      <Route path={`${match?.path}/users`} component={UsersManage} />
    </Switch>
  );
};
