import { apiProcessor } from 'tools/apiProcessor';
import {
  Cdfi,
  Activity,
  ActionItem,
  CdfiSubscriber,
  User,
  CdfiEditFormData,
  Rating,
  CdfiContactEditFormData,
  CdfiContact, ActivityModel,
} from '../../types';
import { performRequest } from 'tools/APITools';
import { CdfiRatingEditFormData, CdfiRatingsInfo } from 'types/cdfiRating';
import { notifyUser } from 'tools';
import { uiText } from 'constants/uiText';
import {PageableTable} from "../../types/pageableTable";

export const getCdfis = (): Promise<Cdfi[]> => {
  return apiProcessor.get('cdfis');
};

export const getCdfi = (cdfiId?: number): Promise<Cdfi> => {
  return apiProcessor.get('cdfi', cdfiId);
};

export const createCdfi = (data: CdfiEditFormData): Promise<void> => {
  return performRequest<void>('cdfiCreate', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const updateCdfi = (
  cdfiId: number | null,
  data: CdfiEditFormData,
): Promise<void> => {
  return performRequest<void>('cdfi', (operationName) =>
    apiProcessor.put(operationName, cdfiId, {
      ...data,
    }),
  );
};

export const deleteCdfi = (cdfiId: number): Promise<void> => {
  return apiProcessor.delete('cdfi', cdfiId);
};

export const getCdfiActivities = (
  type: string,
  id?: number,
): Promise<Activity[]> => {
  return apiProcessor.get('cdfiActivities', { cdfiId: id, companyType: type });
};

export const getVarianceActivities = (
  companyId: number | undefined,
  activities: string[],
  pageNumber: number,
  pageSize: number,
): Promise<PageableTable<ActivityModel>> => {
  const activityParam = activities?.join(',');
  return apiProcessor.get('activitiesSearch', {
    companyId,
    activities: activityParam,
    pageNumber,
    pageSize,
  });
};

export const getActivitiesByType = (
  companyId: number | undefined,
  activities: string[],
  pageNumber: number,
  pageSize: number,
): Promise<PageableTable<ActivityModel>> => {
  const activityParam = activities?.join(',');
  return apiProcessor.get('activitiesSearch', {
    companyId,
    activities: activityParam,
    pageNumber,
    pageSize,
  });
};

export const createActivity = (payload: ActivityModel): Promise<void> => {
  return apiProcessor.put('activityCreate', {}, payload);
};

export const deleteCdfiActivities = (
  activityId: Activity['id'][],
): Promise<void> => {
  return apiProcessor.delete('activityDelete', activityId);
};

export const getActionItems = (cdfiId?: number): Promise<ActionItem[]> => {
  return apiProcessor.get('actionItems', cdfiId);
};

export const getCdfiSubscribers = (
  cdfiId?: number,
): Promise<CdfiSubscriber[]> => {
  return apiProcessor.get('cdfiSubscribers', cdfiId);
};

export const getAnalysts = (cdfiId?: number): Promise<User[]> => {
  return apiProcessor.get('analysts', cdfiId);
};

export const getCdfiContacts = (cdfiId?: number): Promise<CdfiContact[]> => {
  return apiProcessor.get('cdfiContacts', cdfiId);
};

export const updateCdfiContact = (
  cdfiId: number,
  userId: number,
  data: CdfiContactEditFormData,
): Promise<void> => {
  return performRequest<void>('cdfiContactsUpdate', (operationName) =>
    apiProcessor.put(
      operationName,
      { cdfiId: cdfiId, userId: userId },
      {
        ...data,
      },
    ),
  );
};

export const createCdfiContact = (
  cdfiId: number,
  data: CdfiContactEditFormData,
): Promise<void> => {
  return performRequest<void>('cdfiContactsCreate', (operationName) =>
    apiProcessor.post(operationName, cdfiId, {
      ...data,
    }),
  );
};

type UpdateData = {
  analystIds: string[];
};

export const updateCdfiAnalysts = (
  cdfiId: number,
  data: UpdateData,
): Promise<User[]> => {
  return apiProcessor.patch('analysts', cdfiId, data);
};

export const getCdfiRatingsDetails = (
  cdfiId?: number,
): Promise<CdfiRatingsInfo> => {
  return apiProcessor.get('cdfiRatings', cdfiId);
};

export const getCdfiRatings = (cdfiId?: number): Promise<Rating> => {
  return apiProcessor.get('cdfi', cdfiId);
};

export const updateCdfiRating = (
  cdfiId: number,
  ratingId: number,
  data: CdfiRatingEditFormData,
): Promise<void> => {
  return performRequest<void>('cdfiRatingUpdate', (operationName) =>
    apiProcessor
      .put(
        operationName,
        { cdfiId: cdfiId, ratingId: ratingId },
        {
          ...data,
        },
      )
      .then((res) => {
        if (res) {
          notifyUser.ok(uiText('cdfiRatings', 'updateOk'));
        }
      }),
  ).catch((error) => notifyUser.error(uiText('cdfiRatings', 'updateError')));
};

export const createCdfiRating = (
  cdfiId: number,
  data: CdfiRatingEditFormData,
): Promise<void> => {
  return performRequest<void>('cdfiRatingsCreate', (operationName) =>
    apiProcessor.post(operationName, cdfiId, {
      ...data,
    }).then((res)=> {
      if (res) {
        notifyUser.ok(uiText('cdfiRatings', 'createOk'));
      }
    })
  ).catch((error) => notifyUser.error(uiText('cdfiRatings', 'createError')));
};
