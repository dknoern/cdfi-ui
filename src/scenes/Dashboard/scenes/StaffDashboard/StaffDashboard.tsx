import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { RecentActivitiesDashboard } from '../AdminDashboard/scenes/GlobalDashboard/components';

export const StaffDashboardFn: FC = () => {

  return (
    <RecentActivitiesDashboard />
  );
};

export const StaffDashboard = withRouter(StaffDashboardFn);
