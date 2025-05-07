import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { RecentActivitiesDashboard } from '../AdminDashboard/scenes/GlobalDashboard/components';

export const AnalystDashboardFn: FC = () => {

  return (
    <RecentActivitiesDashboard />
  );
};

export const AnalystDashboard = withRouter(AnalystDashboardFn);
