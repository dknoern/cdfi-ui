import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';

export const DefaultDashboardFn: FC = () => {

  return (
    <h1>Default Dashboard</h1>
  );
};

export const DefaultDashboard = withRouter(DefaultDashboardFn);
