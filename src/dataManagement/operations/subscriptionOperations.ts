import {
  Company,
  Subscription,
  SubscriptionEdit,
  SubscriptionProductStatusVM,
  SubscriptionProductStatusVMSelected,
} from 'types';
import { apiProcessor } from 'tools/apiProcessor';

export const getByCompany = (
  companyId: Company['id'],
): Promise<Subscription[]> =>
  apiProcessor.get('subscriptionsByCompany', companyId);

export const getAvailableProductsByCompany = (
  companyId: number,
  subscriptionId: number,
): Promise<SubscriptionProductStatusVM> => {
  return apiProcessor.get('subscriptionAvailableProductsByCompany', {
    companyId,
    subscriptionId,
  });
};

export const addToMyCloud = (
  companyId: number,
  subscriptionId: number,
  data: SubscriptionProductStatusVMSelected,
): Promise<void> => {
  return apiProcessor.post(
    'addToMyCloud',
    {
      companyId,
      subscriptionId,
    },
    { ...data },
  );
};

export const createSubscription = (
  companyId: Company['id'],
  data: SubscriptionEdit,
): Promise<void> => {
  return apiProcessor.post('subscriptionCreate', null, {
    ...data,
    ownerId: companyId,
  });
};

export const updateSubscription = (
  subscriptionId: Subscription['id'],
  data: SubscriptionEdit,
): Promise<void> => {
  return apiProcessor.patch('subscriptionUpdate', subscriptionId, data);
};

export const deleteSubscription = (
  subscriptionId: Subscription['id'],
): Promise<void> => {
  return apiProcessor.delete('subscriptionDelete', subscriptionId);
};
