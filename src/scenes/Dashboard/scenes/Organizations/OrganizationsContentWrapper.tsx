import { ManageCdfis } from 'components/ManageCdfis/ManageCdfis';
import { ManageSubscribers } from 'components/ManageSubscribers/ManageSubscribers';
import { AllOrganizationsManage } from '../../../Manage/scenes/AllOrganizationsManage/AllOrganizationsManage';

import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AllSubscribersManage } from 'scenes/Manage/scenes/AllSubscribersManage';

export const OrganizationsContentWrapper: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {
        <>
          <Route path={`${path}/create-cdfi`} component={ManageCdfis} />
          <Route
            path={`${path}/create-subscriber`}
            component={ManageSubscribers}
          />
          <Route
            path={`${path}/all-organizations`}
            component={AllOrganizationsManage}
          />
          <Route
            path={`${path}/all-subscribers`}
            component={AllSubscribersManage}
          />
        </>
      }
    </Switch>
  );
};
