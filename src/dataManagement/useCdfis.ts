import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Cdfi, DataHookResult, Activity, VoidFn } from 'types';
import { dataMan, ManagerName } from './managers';
import {
  CdfiManager,
  CdfiManagerResults,
  CdfiActivitiesManager,
  ActionItemsManager,
  ActionItemsResults,
  CdfiSubscriberResults,
  CdfiSubscribersManager,
  AnalystsManager,
  AnalystsResults,
  CdfiOrgDetailsManager,
  CdfiOrgDetailsResults,
  CdfiRatingsManager,
  CdfiRatingsResults,
  CdfiContactsResults,
  CdfiContactsManager,
} from './managers/CdfiManager';
import { notifyUser, showAPIError } from '../tools';
import { uiText } from '../constants';
import {
  RatingsManager,
  RatingsManagerResults,
} from './managers/RatingsManager';

// Get CDFIs
type UseCdfisResult = DataHookResult & {
  data: Cdfi[] | null;
};

const mgrCdfi = dataMan.manager(ManagerName.cdfis) as CdfiManager;

export const useCdfis = (): UseCdfisResult => {
  useEffect(() => {
    mgrCdfi.init();
  }, []);

  return useObserver(() => {
    return { ...(mgrCdfi.store as UseCdfisResult) };
  });
};

export const deleteCdfi = (cdfiId: number): Promise<void> => {
  return mgrCdfi
    .deleteCdfi(cdfiId)
    .then(() => {
      notifyUser.ok(uiText('cdfis', 'deleteOk'));
      mgrCdfi.reload();
    })
    .catch(showAPIError(uiText('cdfis', 'deleteError')));
};

// Get CDFI Organization Details
type UseCdfiOrgDetailsResults = DataHookResult & {
  data: CdfiOrgDetailsResults;
  resetStore: VoidFn;
};

const mgrCdfiOrgDetails = dataMan.manager(
  ManagerName.cdfiOrgDetails,
) as CdfiOrgDetailsManager;

export const useCdfiOrgDetails = (
  cdfiId?: number,
): UseCdfiOrgDetailsResults => {
  useEffect(() => {
    if (cdfiId) {
      mgrCdfiOrgDetails.getCdfiOrgDetails(cdfiId);
    }
  }, [cdfiId]);

  return useObserver(() => {
    return {
      ...mgrCdfiOrgDetails.store,
      resetStore: () => {
        mgrCdfiOrgDetails.resetStore();
      },
    } as UseCdfiOrgDetailsResults;
  });
};

// Get CDFI Activities
type UseCdfiActivitiesResult = DataHookResult & {
  data: CdfiManagerResults;
};

const mgrCdfiActivities = dataMan.manager(
  ManagerName.cdfiActivities,
) as CdfiActivitiesManager;

export const useCdfiActivities = (cdfiId: number): UseCdfiActivitiesResult => {
  useEffect(() => {
    mgrCdfiActivities.getCdfiActivities(cdfiId);
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgrCdfiActivities.store as UseCdfiActivitiesResult) };
  });
};

export const deleteCdfiActivities = (
  activityIds: Activity['id'][],
  cdfiId: number,
): Promise<void> => {
  if (activityIds.length == 0) {
    return Promise.resolve();
  }

  return mgrCdfiActivities
    .deleteCdfiActivities(activityIds)
    .then(() => {
      notifyUser.ok(uiText('activities', 'deleteOk'));
      mgrCdfiActivities.reload(cdfiId);
    })
    .catch(showAPIError(uiText('activities', 'deleteError')));
};

// Get CDFI Action items
type UseActionItemsResult = DataHookResult & {
  data: ActionItemsResults;
};

const mgrActionItems = dataMan.manager(
  ManagerName.actionItems,
) as ActionItemsManager;

export const useActionItems = (cdfiId: number): UseActionItemsResult => {
  useEffect(() => {
    mgrActionItems.getActionItems(cdfiId);
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgrActionItems.store as UseActionItemsResult) };
  });
};

// Get CDFI Subscriber
type UseCdfiSubscribersResult = DataHookResult & {
  data: CdfiSubscriberResults;
};

const mgrCdfiSubscribers = dataMan.manager(
  ManagerName.cdfiSubscribers,
) as CdfiSubscribersManager;

export const useCdfiSubscribers = (
  cdfiId: number,
): UseCdfiSubscribersResult => {
  useEffect(() => {
    mgrCdfiSubscribers.getCdfiSubscribers(cdfiId);
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgrCdfiSubscribers.store as UseCdfiSubscribersResult) };
  });
};

// Get CDFI Analysts
type UseAnalystsResult = DataHookResult & {
  data: AnalystsResults;
};

const mgrAnalysts = dataMan.manager(ManagerName.analysts) as AnalystsManager;

export const useAnalysts = (cdfiId: number): UseAnalystsResult => {
  useEffect(() => {
    mgrAnalysts.getAnalysts(cdfiId);
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgrAnalysts.store as UseAnalystsResult) };
  });
};

// Get CDFI Ratings
type UseCdfiRatingsResultsDetails = DataHookResult & {
  data: CdfiRatingsResults;
};

const mgrCdfiRatingsDetails = dataMan.manager(
  ManagerName.cdfiRatingsDetails,
) as CdfiRatingsManager;

export const useCdfiRatingsDetails = (
  cdfiId: number,
  deleteRating: boolean
): UseCdfiRatingsResultsDetails => {
  useEffect(() => {
    mgrCdfiRatingsDetails.getCdfiRatingsDetails(cdfiId);
  }, [cdfiId, deleteRating]);

  return useObserver(() => {
    return { ...(mgrCdfiRatingsDetails.store as UseCdfiRatingsResultsDetails) };
  });
};

// Get CDFI Ratings
type UseCdfiRatingsResults = DataHookResult & {
  data: RatingsManagerResults;
};

const mgrCdfiRatings = dataMan.manager(
  ManagerName.cdfiRatings,
) as RatingsManager;

export const useCdfiRatings = (cdfiId: number): UseCdfiRatingsResults => {
  useEffect(() => {
    mgrCdfiRatings.getCdfiRatings(cdfiId);
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgrCdfiRatings.store as UseCdfiRatingsResults) };
  });
};

// Get CDFI Contacts
type UseCdfiContactsResult = DataHookResult & {
  data: CdfiContactsResults;
};

const mgrCdfiContacts = dataMan.manager(
  ManagerName.cdfiContacts,
) as CdfiContactsManager;

export const useCdfiContacts = (cdfiId: number): UseCdfiContactsResult => {
  useEffect(() => {
    if (!cdfiId) return;
    mgrCdfiContacts.getCdfiContacts(cdfiId);
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgrCdfiContacts.store as UseCdfiContactsResult) };
  });
};
