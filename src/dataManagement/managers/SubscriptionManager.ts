import {
  getByCompany,
  getAvailableProductsByCompany,
  createSubscription,
  updateSubscription,
  deleteSubscription, addToMyCloud,
} from '../operations/subscriptionOperations';
import { ManagerDefault } from './ManagerDefault';

export class SubscriptionManager extends ManagerDefault {
  getByCompany: typeof getByCompany = (companyId) => {
    return getByCompany(companyId);
  };

  getAvailableProductsByCompany: typeof getAvailableProductsByCompany = (
    companyId,
    subscriptionId,
  ) => {
    return getAvailableProductsByCompany(companyId, subscriptionId);
  };

  addToMyCloud: typeof addToMyCloud = (
    companyId,
    subscriptionId,
    data,
  ) => {
    return addToMyCloud(companyId, subscriptionId, data);
  };


  create: typeof createSubscription = (companyId, data) => {
    return createSubscription(companyId, data);
  };

  update: typeof updateSubscription = (subscriptionId, data) => {
    return updateSubscription(subscriptionId, data);
  };

  delete: typeof deleteSubscription = (subscriptionId) => {
    return deleteSubscription(subscriptionId);
  };
}
