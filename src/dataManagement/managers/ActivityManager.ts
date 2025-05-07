import { Activity } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import {deleteActivities, getActivities} from '../operations/activityOperations';
import { ManagerDefault } from './ManagerDefault';

export interface ActivityManagerResults {
  cdfi: Activity[],
  subscribers: Activity[],
  aeris: Activity[],
}

export class ActivityManager extends ManagerDefault<ActivityManagerResults> {
  reload = (): void => {
    this.proceedReload(
      () => Promise.all([getActivities('cdfi'),  getActivities('investor'),  getActivities('cars')])
      .then((values): ActivityManagerResults => ({
        cdfi: values[0],
        subscribers: values[1],
        aeris: values[2],
      })),
      (e) => {
        notifyUser.error(uiText('activities', 'loadError'));
      },
    );
  };

  deleteActivities: typeof deleteActivities = (activityIds) => {
    return deleteActivities(activityIds);
  };
}
