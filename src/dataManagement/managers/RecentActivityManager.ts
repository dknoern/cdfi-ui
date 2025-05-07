import { Activity } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { getRecentActivities } from '../operations/activityOperations';
import { ManagerDefault } from './ManagerDefault';

export interface RecentActivityManagerResults {
  cdfiRecentActivity: Activity[];
}

export class RecentActivityManager extends ManagerDefault<RecentActivityManagerResults> {
  reload = (cdfiId?: number): void => {
    this.getRecentActivities(cdfiId);
  };

  getRecentActivities = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getRecentActivities(cdfiId)]).then(
          (values): RecentActivityManagerResults => ({
            cdfiRecentActivity: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('rating', 'loadError'));
      },
    );
  };
}
