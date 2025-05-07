import React, { FC } from 'react';
import { WithCompanyTypeProps } from './types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { MyCdfis } from './MyCdfis';
import { CdfiManage } from '../../../Manage/scenes';

export const SubscribersContentWrapper: FC<WithCompanyTypeProps> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      {
        <>
          <Route path={`${path}`} exact component={MyCdfis} />
          <Route path={`${path}/cdfi/:id`} component={CdfiManage} />
        </>
      }
    </Switch>
  );
};
