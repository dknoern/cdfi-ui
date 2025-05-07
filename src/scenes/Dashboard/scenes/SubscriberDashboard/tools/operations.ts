import { Company, SubscriberSubscriptionEditFormData } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { SubscriberSubscriptionsManager } from 'dataManagement/managers/SubscriberManager';

interface UpdateFnSubscriberSubscription {
  (
    subscriberId: Company['id'],
    subscriptionId: SubscriberSubscriptionEditFormData['id'],
    data: SubscriberSubscriptionEditFormData,
  ): Promise<void>;
}

const mgrSubscriberSubscriptions = dataMan.manager(
  ManagerName.subscriberSubscriptions,
) as SubscriberSubscriptionsManager;

export const updateSubscriberSubscription: UpdateFnSubscriberSubscription = (
  subscriberId,
  subscriptionId,
  data,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrSubscriberSubscriptions.updateSubscriberSubscription
  > =>
    mgrSubscriberSubscriptions.updateSubscriberSubscription(
      subscriberId,
      subscriptionId,
      data,
    );

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('subscriberSubscriptions', 'updateOk'));
      mgrSubscriberSubscriptions.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subscriberSubscriptions', 'updateError');
      showAPIError(message)(error);
    });
};

interface CreateFnSubscriberSubscription {
  (
    subscriberId: Company['id'],
    data: SubscriberSubscriptionEditFormData,
  ): Promise<void>;
}

export const createSubscriberSubscription: CreateFnSubscriberSubscription = (
  subscriberId,
  data,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrSubscriberSubscriptions.createSubscriberSubscription
  > =>
    mgrSubscriberSubscriptions.createSubscriberSubscription(subscriberId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('subscriberSubscriptions', 'createOk'));
      mgrSubscriberSubscriptions.reload(subscriberId);
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subscriberSubscriptions', 'createError');
      showAPIError(message)(error);
    });
};

interface DeleteFnSubscriberSubscription {
  (
    subscriberId: Company['id'],
    subscriptionId?: SubscriberSubscriptionEditFormData['id'],
  ): Promise<void>;
}

export const deleteSubscriberSubscription: DeleteFnSubscriberSubscription = (
  subscriberId,
  subscriptionId,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrSubscriberSubscriptions.deleteSubscriberSubscription
  > =>
    mgrSubscriberSubscriptions.deleteSubscriberSubscription(subscriberId, subscriptionId);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('subscriberSubscriptions', 'deleteOk'));
      mgrSubscriberSubscriptions.reload(subscriberId);
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subscriberSubscriptions', 'deleteError');
      showAPIError(message)(error);
    });
};