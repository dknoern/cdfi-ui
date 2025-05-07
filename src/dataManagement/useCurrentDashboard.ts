import { useEffect } from 'react';
import { DataHook, Dashboard } from 'types';
import { dataMan, ManagerName } from './managers';

const mgr = dataMan.manager(ManagerName.dashboard);

export const useCurrentDashboard: DataHook<{}, Dashboard> = () => {
  useEffect(mgr.init, []);

  return mgr.store;
};
