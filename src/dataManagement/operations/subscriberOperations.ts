import { apiProcessor } from 'tools/apiProcessor';
import {
  Activity,
  DelegatedSubscription,
  SubscriberContact,
  SubscriberContactEditFormData,
  SubscriberEditFormData,
  SubscriberSubscriptionEditFormData,
  SubscriberSubscriptionsDTO,
} from 'types';
import { Subscriber } from 'types/subscriber';
import { performRequest } from 'tools/APITools';
import { subscriberStore } from 'store';

export const getSubscribers = (): Promise<Subscriber[]> => {
  return apiProcessor.get('subscribers');
};

export const getSubscriber = (subscriberId?: number): Promise<Subscriber> => {
  return apiProcessor.get('subscriber', subscriberId);
};

export const getSubscriberSubscription = (
  subscriberId: number,
  subscriptionId: number,
): Promise<SubscriberSubscriptionEditFormData> => {
  return apiProcessor.get('subscriberSubscription', {
    subscriberId: subscriberId,
    subscriptionId: subscriptionId,
  });
};

export const createSubscriber = (
  data: SubscriberEditFormData,
): Promise<void> => {
  return performRequest<void>('subscribers', (operationName) =>
    apiProcessor.post(operationName, null, {
      ...data,
    }),
  );
};

export const deleteSubscriber = (subscriberId: number): Promise<void> => {
  return apiProcessor.delete('subscriber', subscriberId);
};

export const updateSubscriber = (
  subscriberId: number | null,
  data: SubscriberEditFormData,
): Promise<void> => {
  return performRequest<void>('subscriber', (operationName) =>
    apiProcessor.put(operationName, subscriberId, {
      ...data,
    }),
  );
};

export const getSubscriberActivities = (
  activityType: string,
  subscriberId?: number,
): Promise<Activity[]> => {
  return apiProcessor.get('subscriberActivities', {
    subscriberId: subscriberId,
    activityType: activityType,
  });
};

export const getSubscriberContacts = (
  subscriberId?: number | null,
): Promise<SubscriberContact[]> => {
  return apiProcessor.get('subscriberContacts', subscriberId);
};

export const updateSubscriberContact = (
  subscriberId: number,
  userId: number,
  data: SubscriberContactEditFormData,
): Promise<void> => {
  return performRequest<void>('subscriberContactsUpdate', (operationName) =>
    apiProcessor.put(
      operationName,
      { subscriberId: subscriberId, userId: userId },
      {
        ...data,
      },
    ),
  );
};

export const createSubscriberContact = (
  subscriberId: number,
  data: SubscriberContactEditFormData,
): Promise<void> => {
  return performRequest<void>('subscriberContactsCreate', (operationName) =>
    apiProcessor.post(operationName, subscriberId, {
      ...data,
    }),
  );
};

export const getSubscriberSubscriptions = (
  subscriberId: number,
  pageNumber: number =1,
  pageSize: number = 10,
  sorter: any= {field: 'startDate', order: 'descend'}
): Promise<SubscriberSubscriptionsDTO> => {
  subscriberStore.setSorter(sorter);
    const order = sorter.order === "descend" ? "desc" : sorter.order === "ascend" ? "asc" : "";
    const field = sorter.field === "startDate" ? "startDate" :
    sorter.field === "expirationDate" ? "expirationDate" : "";
     
  return apiProcessor.get('subscriberSubscriptions', {subscriberId, 
    pageNumber,
    pageSize,
    field,
    order,
  });
};

export const createSubscriberSubscription = (
  subscriberId: number,
  data: SubscriberSubscriptionEditFormData,
): Promise<void> => {
  return performRequest<void>(
    'subscriberSubscriptionsCreate',
    (operationName) =>
      apiProcessor.post(operationName, subscriberId, {
        ...data,
      }),
  );
};

export const updateSubscriberSubscription = (
  subscriberId: number,
  subscriptionId: number,
  data: SubscriberSubscriptionEditFormData,
): Promise<void> => {
  return performRequest<void>(
    'subscriberSubscriptionsUpdate',
    (operationName) =>
      apiProcessor.put(
        operationName,
        { subscriberId: subscriberId, subscriptionId: subscriptionId },
        {
          ...data,
        },
      ),
  );
};

export const deleteSubscriberSubscription = (
  subscriberId: number,
  subscriptionId?: number,
): Promise<SubscriberSubscriptionEditFormData[]> => {
  return apiProcessor.delete('subscriberSubscriptionsDelete', {
    subscriberId: subscriberId,
    subscriptionId: subscriptionId,
  });
};

export const getDelegatedSubscriptions = (
  subscriberId?: number,
): Promise<DelegatedSubscription[]> => {
  return apiProcessor.get('delegatedSubscriptions', subscriberId);
};
