import { ManagerDefault } from './ManagerDefault';
import {
  getSubscribers,
  createSubscriber,
  getSubscriberActivities,
  getSubscriberContacts,
  updateSubscriberContact,
  createSubscriberContact,
  getSubscriber,
  updateSubscriber,
  deleteSubscriber,
  getSubscriberSubscriptions,
  getDelegatedSubscriptions,
  createSubscriberSubscription,
  updateSubscriberSubscription,
  deleteSubscriberSubscription
} from '../operations/subscriberOperations';
import { notifyUser, showAPIError } from 'tools';
import { uiText } from 'constants/uiText';
import {
  Subscriber,
  Activity,
  SubscriberContact,
  DelegatedSubscription,
  SubscriberSubscriptionsDTO,
} from 'types';

export class SubscriberManager extends ManagerDefault<Subscriber[]> {
  reload = (): void => {
    this.proceedReload(
      this.getSubscribers,
      showAPIError(uiText('subscribers', 'loadError')),
    );
  };

  getSubscribers: typeof getSubscribers = () => {
    return getSubscribers();
  };

  createSubscriber: typeof createSubscriber = (data) => {
    return createSubscriber(data);
  };

  updateSubscriber: typeof updateSubscriber = (subscriberId, data) => {
    return updateSubscriber(subscriberId, data);
  };

  deleteSubscriber: typeof deleteSubscriber = (subscriberId) => {
    return deleteSubscriber(subscriberId);
  };
}

export interface SubscriberActivitiesManagerResults {
  documents: Activity[];
  financials: Activity[];
  factSheets: Activity[];
}

export class SubscriberActivitiesManager extends ManagerDefault<SubscriberActivitiesManagerResults> {
  reload = (subscriberId?: number): void => {
    this.getSubscriberActivities(subscriberId);
  };

  getSubscriberActivities = (subscriberId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([
          getSubscriberActivities('DOCUMENT_DOWNLOAD', subscriberId),
          getSubscriberActivities('FINANCIALS_VIEW', subscriberId),
          getSubscriberActivities('FACT_SHEET', subscriberId),
        ]).then(
          (values): SubscriberActivitiesManagerResults => ({
            documents: values[0],
            financials: values[1],
            factSheets: values[2],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('subscriberActivities', 'loadError'));
      },
    );
  };
}

export interface SubscriberContactsResults {
  contacts: SubscriberContact[];
}

export class SubscriberContactsManager extends ManagerDefault<SubscriberContactsResults> {
  reload = (subscriberId?: number): void => {
    if (!subscriberId) return;
    this.getSubscriberContacts(subscriberId);
  };

  getSubscriberContacts = (subscriberId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getSubscriberContacts(subscriberId)]).then(
          (values): SubscriberContactsResults => ({
            contacts: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('subscriberContacts', 'loadError'));
      },
    );
  };

  updateSubscriberContact: typeof updateSubscriberContact = (
    subscriberId,
    userId,
    data,
  ) => {
    return updateSubscriberContact(subscriberId, userId, data).then(() =>
      this.reload(subscriberId),
    );
  };

  createSubscriberContact: typeof createSubscriberContact = (
    subscriberId,
    data,
  ) => {
    return createSubscriberContact(subscriberId, data).then(() =>
      this.reload(subscriberId),
    );
  };
}

export interface SubscriberOrgDetailsResults {
  subscriber: Subscriber;
}

export class SubscriberOrgDetailsManager extends ManagerDefault<SubscriberOrgDetailsResults> {
  reload = (subscriberId?: number): void => {
    this.getSubscriberOrgDetails(subscriberId);
  };

  getSubscriberOrgDetails = (subscriberId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getSubscriber(subscriberId)]).then(
          (values): SubscriberOrgDetailsResults => ({
            subscriber: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('subscriberOrgDetails', 'loadError'));
      },
    );
  };
}

export interface SubscriberSubscriptionsResults {
  subscriberSubscriptions: SubscriberSubscriptionsDTO;
}

export class SubscriberSubscriptionsManager extends ManagerDefault<SubscriberSubscriptionsResults> {
  reload = (subscriberId?: number): void => {
    if (!subscriberId) return;
    this.getSubscriberSubscriptions(subscriberId);
  };

  getSubscriberSubscriptions = (subscriberId: number, pageNumber?: number, pageSize?: number, sorter?: any): void => {
    this.proceedReload(
      () =>
        getSubscriberSubscriptions(subscriberId, pageNumber, pageSize, sorter).then(
          (values): SubscriberSubscriptionsResults => {
            return({
            subscriberSubscriptions: values
          })
        },
        ),
      (e) => {
        notifyUser.error(uiText('subscriberSubscriptions', 'loadError'));
      },
    );
  };

  createSubscriberSubscription: typeof createSubscriberSubscription = (subscriberId, data) => {
    return createSubscriberSubscription(subscriberId, data);
  };

  updateSubscriberSubscription: typeof updateSubscriberSubscription = (
    subscriberId,
    subscriptionId,
    data,
  ) => {
    return updateSubscriberSubscription(subscriberId, subscriptionId, data).then(() =>
      this.reload(subscriberId),
    );
  };

  deleteSubscriberSubscription: typeof deleteSubscriberSubscription = (subscriberId, subscriptionId) => {
    return deleteSubscriberSubscription(subscriberId, subscriptionId);
  };
}

export interface DelegatedSubscriptionsResults {
  delegatedSubscriptions: DelegatedSubscription[];
}

export class DelegatedSubscriptionsManager extends ManagerDefault<DelegatedSubscriptionsResults> {
  reload = (subscriberId?: number): void => {
    if (!subscriberId) return;
    this.getDelegatedSubscriptions(subscriberId);
  };

  getDelegatedSubscriptions = (subscriberId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getDelegatedSubscriptions(subscriberId)]).then(
          (values): DelegatedSubscriptionsResults => ({
            delegatedSubscriptions: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('delegatedSubscriptions', 'loadError'));
      },
    );
  };
}
