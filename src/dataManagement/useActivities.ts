import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import {Activity, DataHookResult} from 'types';
import { dataMan, ManagerName } from './managers';
import {
  ActivityManager,
  ActivityManagerResults,
} from './managers/ActivityManager';
import { notifyUser, showAPIError } from '../tools';
import { uiText } from '../constants';

type UseActivitiesResult = DataHookResult & {
  data: ActivityManagerResults;
};

const mgr = dataMan.manager(ManagerName.activities) as ActivityManager;

export const useActivities = (): UseActivitiesResult => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => {
    return { ...(mgr.store as UseActivitiesResult) };
  });
};

export const deleteActivities = (activityIds: Activity['id'][]): Promise<void> => {
  return mgr
    .deleteActivities(activityIds)
    .then(() => {
      notifyUser.ok(uiText('activities', 'deleteOk'));
      mgr.reload();
    })
    .catch(showAPIError(uiText('activities', 'deleteError')));
};
