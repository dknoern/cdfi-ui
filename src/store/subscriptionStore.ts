import { apiProcessor } from '../tools';
import { Subscription } from '../types';
import { action, decorate, observable } from 'mobx';

class SubscriptionStore {
  activeSubscriptions: Subscription[] | undefined;

  hasAerisExplorerSubscription = (
    subscriberId: number | undefined,
  ): boolean => {
    // this check only applies to subscribers
    if (subscriberId === undefined) {
      return true;
    }

    if (this.activeSubscriptions === undefined) {
      return false;
    }

    return this.activeSubscriptions
      .map((sub) => sub.isPeerGroups)
      .some((enabled) => enabled);
  };

  getActiveSubscriptions = async (): Promise<Subscription[] | undefined> => {
    return await apiProcessor
      .get('subscriptionsByCurrentUser')
      .then((response) => {
        this.activeSubscriptions = response;
        return response;
      });
  };
}

decorate(SubscriptionStore, {
  activeSubscriptions: observable,
  getActiveSubscriptions: action,
  hasAerisExplorerSubscription: action,
});

export const subscriptionStore = new SubscriptionStore();
