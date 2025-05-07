import React, { FC } from 'react';
import { userStore } from 'store';
import {
  AdminDashboard,
  CdfiDashboard,
  DefaultDashboard,
  AnalystDashboard,
  StaffDashboard,
  ContractorDashboard
} from './scenes';

export const Dashboard: FC = React.memo(() => {
  let DashboardComponent;

  if (userStore.isAerisAdmin) {
    DashboardComponent = AdminDashboard;
  } else if (userStore.isAerisAnalyst) {
    DashboardComponent = AnalystDashboard;
  } else if (userStore.isCdfi) {
    DashboardComponent = CdfiDashboard;
  } else if (userStore.isStaff) {
    DashboardComponent = StaffDashboard;
  } else if (userStore.isContractor) {
    DashboardComponent = ContractorDashboard;
  } else {
    DashboardComponent = DefaultDashboard;
  }
  return <DashboardComponent />;
});
