import {
  User,
  Company,
  CdfiContactEditFormData,
  SubscriberContactEditFormData,
} from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { CdfiContactsManager } from 'dataManagement/managers/CdfiManager';
import { SubscriberContactsManager } from 'dataManagement/managers/SubscriberManager';

const mgrCdfiContacts = dataMan.manager(
  ManagerName.cdfiContacts,
) as CdfiContactsManager;

interface SaveFnCdfi {
  (
    companyId: Company['id'],
    userId: User['id'],
    data: CdfiContactEditFormData,
  ): Promise<void>;
}

export const updateCdfiContact: SaveFnCdfi = (cdfiId, userId, data) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrCdfiContacts.updateCdfiContact
  > => mgrCdfiContacts.updateCdfiContact(cdfiId, userId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('cdfiContacts', 'updateOk'));
      mgrCdfiContacts.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('cdfiContacts', 'updateError');
      showAPIError(message)(error);
    });
};

interface CreateFnCdfi {
  (
    companyId: Company['id'],
    data: CdfiContactEditFormData,
  ): Promise<void>;
}

export const createCdfiContact: CreateFnCdfi = (
  cdfiId,
  data,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrCdfiContacts.createCdfiContact
  > => mgrCdfiContacts.createCdfiContact(cdfiId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('cdfiContacts', 'createOk'));
      mgrSubscriberContacts.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('cdfiContacts', 'createError');
      showAPIError(message)(error);
    });
};

interface UpdateFnSubscriber {
  (
    companyId: Company['id'],
    userId: User['id'],
    data: SubscriberContactEditFormData,
  ): Promise<void>;
}

const mgrSubscriberContacts = dataMan.manager(
  ManagerName.subscriberContacts,
) as SubscriberContactsManager;

export const updateSubscriberContact: UpdateFnSubscriber = (
  subscriberId,
  userId,
  data,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrSubscriberContacts.updateSubscriberContact
  > =>
    mgrSubscriberContacts.updateSubscriberContact(subscriberId, userId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('subscriberContacts', 'updateOk'));
      mgrSubscriberContacts.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subscriberContacts', 'updateError');
      showAPIError(message)(error);
    });
};

interface CreateFnSubscriber {
  (
    companyId: Company['id'],
    data: SubscriberContactEditFormData,
  ): Promise<void>;
}

export const createSubscriberContact: CreateFnSubscriber = (
  subscriberId,
  data,
) => {
  const proceedUpdate = (): ReturnType<
    typeof mgrSubscriberContacts.createSubscriberContact
  > => mgrSubscriberContacts.createSubscriberContact(subscriberId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('subscriberContacts', 'createOk'));
      mgrSubscriberContacts.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('subscriberContacts', 'createError');
      showAPIError(message)(error);
    });
};
