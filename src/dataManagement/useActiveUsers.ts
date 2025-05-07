import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import { ActiveUsersManager, ActiveUsersManagerResults } from './managers/ActiveUsersManager';

type UseAerisAdminUsersResult = DataHookResult & {
  data: ActiveUsersManagerResults;
};

const mgr = dataMan.manager(
  ManagerName.activeUsers,
) as ActiveUsersManager;

export const useActiveUsers = (): UseAerisAdminUsersResult => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => {
    return { ...(mgr.store as UseAerisAdminUsersResult) };
  });
};
