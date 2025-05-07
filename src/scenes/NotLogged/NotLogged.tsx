import React, { FC } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Login, ChangePassword } from 'scenes';
import { ResetPassword } from './components';

export const NotLogged: FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/resetPassword" component={ResetPassword} />
      <Route exact path="/changePassword/:username" component={ChangePassword} />
      <Redirect to="/login" />
    </Switch>
  );
};
