import { Activity } from '../../types';
import { apiProcessor } from '../../tools';

export const getActivities = (companyType?: string): Promise<Activity[]> => {
  return apiProcessor.get('activity', companyType);
};

export const getRecentActivities = (cdfiId?: number): Promise<Activity[]> => {
  return apiProcessor.get('recentActivity', cdfiId);
};

export const deleteActivities = (
  activityId: Activity['id'][],
): Promise<void> => {
  return apiProcessor.delete('activityDelete', activityId);
};
