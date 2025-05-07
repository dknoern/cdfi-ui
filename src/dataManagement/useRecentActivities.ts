import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Activity, DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import { RecentActivityManager } from './managers/RecentActivityManager';

type UseRecentActivitiesResult = DataHookResult & {
  data: any;
};

const mgr = dataMan.manager(
  ManagerName.recentActivities,
) as RecentActivityManager;

export const useRecentActivities = (
  cdfiId: number,
): UseRecentActivitiesResult => {
  useEffect(() => {
    mgr.getRecentActivities(cdfiId);
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgr.store as UseRecentActivitiesResult) };
  });
};
