import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult, Subscriber, VoidFn } from 'types';
import { dataMan, ManagerName } from './managers';
import {
  SubscriberManager,
  SubscriberActivitiesManagerResults,
  SubscriberActivitiesManager,
  SubscriberContactsManager,
  SubscriberContactsResults,
  SubscriberOrgDetailsResults,
  SubscriberOrgDetailsManager,
  SubscriberSubscriptionsResults,
  SubscriberSubscriptionsManager,
  DelegatedSubscriptionsResults,
  DelegatedSubscriptionsManager,
} from './managers/SubscriberManager';
import { notifyUser, showAPIError } from '../tools';
import { uiText } from '../constants';

type UseSubscribersResult = DataHookResult & {
  data: Subscriber[] | null;
};

const mgrSubscribers = dataMan.manager(
  ManagerName.subscribers,
) as SubscriberManager;

export const useSubscribers = (): UseSubscribersResult => {
  useEffect(() => {
    mgrSubscribers.init();
  }, []);

  return useObserver(() => {
    return { ...(mgrSubscribers.store as UseSubscribersResult) };
  });
};

export const deleteSubscriber = (subscriberId: number): Promise<void> => {
  return mgrSubscribers
    .deleteSubscriber(subscriberId)
    .then(() => {
      notifyUser.ok(uiText('subscribers', 'deleteOk'));
      mgrSubscribers.reload();
    })
    .catch(showAPIError(uiText('subscribers', 'deleteError')));
};

// Get Subscriber Activities
type UseSubscriberActivitiesResult = DataHookResult & {
  data: SubscriberActivitiesManagerResults;
};

const mgrSubscriberActivities = dataMan.manager(
  ManagerName.subscriberActivities,
) as SubscriberActivitiesManager;

export const useSubscriberActivities = (
  subscriberId: number,
): UseSubscriberActivitiesResult => {
  useEffect(() => {
    if (!subscriberId) return;
    mgrSubscriberActivities.getSubscriberActivities(subscriberId);
  }, [subscriberId]);

  return useObserver(() => {
    return {
      ...(mgrSubscriberActivities.store as UseSubscriberActivitiesResult),
    };
  });
};

// Get Subscriber Contacts
type UseSubscriberContactsResult = DataHookResult & {
  data: SubscriberContactsResults;
};

const mgrSubscriberContacts = dataMan.manager(
  ManagerName.subscriberContacts,
) as SubscriberContactsManager;

export const useSubscriberContacts = (
  subscriberId: number | null,
): UseSubscriberContactsResult => {
  useEffect(() => {
    if (!subscriberId) return;
    mgrSubscriberContacts.getSubscriberContacts(subscriberId);
  }, [subscriberId]);

  return useObserver(() => {
    return { ...(mgrSubscriberContacts.store as UseSubscriberContactsResult) };
  });
};

// Get Subscriber Organization Details
type UseSubscriberOrgDetailsResults = DataHookResult & {
  data: SubscriberOrgDetailsResults;
  resetStore: VoidFn;
};

const mgrSubscriberOrgDetails = dataMan.manager(
  ManagerName.subscriberOrgDetails,
) as SubscriberOrgDetailsManager;

export const useSubscriberOrgDetails = (
  subscriberId?: number,
): UseSubscriberOrgDetailsResults => {
  useEffect(() => {
    if (subscriberId) {
      mgrSubscriberOrgDetails.getSubscriberOrgDetails(subscriberId);
    }
  }, [subscriberId]);

  return useObserver(() => {
    return {
      ...mgrSubscriberOrgDetails.store,
      resetStore: () => {
        mgrSubscriberOrgDetails.resetStore();
      },
    } as UseSubscriberOrgDetailsResults;
  });
};

// Get Subscriptions for a Subscriber
type UseSubscriberSubscriptionsResults = DataHookResult & {
  data: SubscriberSubscriptionsResults;
};

const mgrSubscriberSubscriptions = dataMan.manager(
  ManagerName.subscriberSubscriptions,
) as SubscriberSubscriptionsManager;

export const useSubscriberSubscriptions = (
  subscriberId?: number | null | undefined,
): UseSubscriberSubscriptionsResults => {
  useEffect(() => {
    if (subscriberId) {
      mgrSubscriberSubscriptions.getSubscriberSubscriptions(subscriberId);
    }
  }, [subscriberId]);

  return useObserver(() => {
    return {
      ...(mgrSubscriberSubscriptions.store as UseSubscriberSubscriptionsResults),
    };
  });
};

// Get Delegated Subscriptions for a Subscriber
type UseDelegatedSubscriptionsResults = DataHookResult & {
  data: DelegatedSubscriptionsResults;
};

const mgrDelegatedSubscriptions = dataMan.manager(
  ManagerName.delegatedSubscriptions,
) as DelegatedSubscriptionsManager;

export const useDelegatedSubscriptions = (
  subscriberId?: number,
): UseDelegatedSubscriptionsResults => {
  useEffect(() => {
    if (subscriberId) {
      mgrDelegatedSubscriptions.getDelegatedSubscriptions(subscriberId);
    }
  }, [subscriberId]);

  return useObserver(() => {
    return {
      ...(mgrDelegatedSubscriptions.store as UseDelegatedSubscriptionsResults),
    };
  });
};
