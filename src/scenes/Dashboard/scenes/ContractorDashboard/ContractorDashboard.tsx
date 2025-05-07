import React, { FC } from 'react';
import { withRouter } from 'react-router-dom';
import { RecentActivitiesDashboard } from '../AdminDashboard/scenes/GlobalDashboard/components';

export const ContractorDashboardFn: FC = () => {

  return (
    <RecentActivitiesDashboard />
  );
};

export const ContractorDashboard = withRouter(ContractorDashboardFn);
