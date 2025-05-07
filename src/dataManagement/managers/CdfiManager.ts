import { ManagerDefault } from './ManagerDefault';
import {
  Activity,
  Cdfi,
  ActionItem,
  CdfiSubscriber,
  User,
  CdfiContact,
} from 'types';
import {
  getCdfis,
  getCdfiActivities,
  deleteCdfiActivities,
  getActionItems,
  getCdfiSubscribers,
  getAnalysts,
  getCdfi,
  createCdfi,
  updateCdfi,
  updateCdfiAnalysts,
  deleteCdfi,
  getCdfiRatingsDetails,
  getCdfiContacts,
  updateCdfiContact,
  createCdfiContact,
  updateCdfiRating,
  createCdfiRating,
} from '../operations/cdfiOperations';
import { showAPIError } from 'tools';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { CdfiRatingsInfo } from 'types/cdfiRating';

export class CdfiManager extends ManagerDefault<Cdfi[]> {
  reload = (): void => {
    this.proceedReload(
      this.getCdfis,
      showAPIError(uiText('cdfis', 'loadError')),
    );
  };

  getCdfis: typeof getCdfis = () => {
    return getCdfis();
  };

  createCdfi: typeof createCdfi = (data) => {
    return createCdfi(data);
  };

  updateCdfi: typeof updateCdfi = (cdfiId, data) => {
    return updateCdfi(cdfiId, data);
  };

  deleteCdfi: typeof deleteCdfi = (cdfiId) => {
    return deleteCdfi(cdfiId);
  };
}

export interface CdfiOrgDetailsResults {
  cdfi: Cdfi;
}

export class CdfiOrgDetailsManager extends ManagerDefault<CdfiOrgDetailsResults> {
  reload = (cdfiId?: number): void => {
    this.getCdfiOrgDetails(cdfiId);
  };

  getCdfiOrgDetails = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCdfi(cdfiId)]).then(
          (values): CdfiOrgDetailsResults => ({
            cdfi: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('cdfiOrgDetails', 'loadError'));
      },
    );
  };
}

export interface CdfiManagerResults {
  cdfi: Activity[];
  subscribers: Activity[];
  aeris: Activity[];
}
export class CdfiActivitiesManager extends ManagerDefault<CdfiManagerResults> {
  reload = (cdfiId?: number): void => {
    this.getCdfiActivities(cdfiId);
  };

  getCdfiActivities = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([
          getCdfiActivities('cdfi', cdfiId),
          getCdfiActivities('investor', cdfiId),
          getCdfiActivities('cars', cdfiId),
        ]).then(
          (values): CdfiManagerResults => ({
            cdfi: values[0],
            subscribers: values[1],
            aeris: values[2],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('cdfiActivities', 'loadError'));
      },
    );
  };

  deleteCdfiActivities: typeof deleteCdfiActivities = (activityIds) => {
    return deleteCdfiActivities(activityIds);
  };
}

export interface ActionItemsResults {
  actionItems: ActionItem[];
}

export class ActionItemsManager extends ManagerDefault<ActionItemsResults> {
  reload = (cdfiId?: number): void => {
    this.getActionItems(cdfiId);
  };

  getActionItems = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getActionItems(cdfiId)]).then(
          (values): ActionItemsResults => ({
            actionItems: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('actionItems', 'loadError'));
      },
    );
  };
}

export interface CdfiSubscriberResults {
  subscribers: CdfiSubscriber[];
}

export class CdfiSubscribersManager extends ManagerDefault<CdfiSubscriberResults> {
  reload = (cdfiId?: number): void => {
    this.getCdfiSubscribers(cdfiId);
  };

  getCdfiSubscribers = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCdfiSubscribers(cdfiId)]).then(
          (values): CdfiSubscriberResults => ({
            subscribers: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('cdfiSubscribers', 'loadError'));
      },
    );
  };
}

export interface AnalystsResults {
  analysts: User[];
}

export class AnalystsManager extends ManagerDefault<AnalystsResults> {
  reload = (cdfiId?: number): void => {
    this.getAnalysts(cdfiId);
  };

  getAnalysts = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getAnalysts(cdfiId)]).then(
          (values): AnalystsResults => ({
            analysts: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('actionItems', 'loadError'));
      },
    );
  };

  updateCdfiAnalysts: typeof updateCdfiAnalysts = (cdfiId, data) => {
    return updateCdfiAnalysts(cdfiId, data);
  };
}

export interface CdfiRatingsResults {
  cdfiRatingsInfo: CdfiRatingsInfo;
}

export class CdfiRatingsManager extends ManagerDefault<CdfiRatingsResults> {
  reload = (cdfiId?: number): void => {
    this.getCdfiRatingsDetails(cdfiId);
  };

  getCdfiRatingsDetails = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCdfiRatingsDetails(cdfiId)]).then(
          (values): CdfiRatingsResults => ({
            cdfiRatingsInfo: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('cdfiRatings', 'loadError'));
      },
    );
  };

  updateCdfiRating: typeof updateCdfiRating = (cdfiId, ratingId, data) => {
    return updateCdfiRating(cdfiId, ratingId, data).then(() =>
      this.reload(cdfiId),
    );
  };

  createCdfiRating: typeof createCdfiRating = (cdfiId, data) => {
    return createCdfiRating(cdfiId, data).then(()=> this.reload(cdfiId))
  }
}

export interface CdfiContactsResults {
    contacts: CdfiContact[];
}

export class CdfiContactsManager extends ManagerDefault<CdfiContactsResults> {
  reload = (cdfiId?: number): void => {
    if (!cdfiId) return;
    this.getCdfiContacts(cdfiId);
  };

  getCdfiContacts = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCdfiContacts(cdfiId)]).then(
          (values): CdfiContactsResults => ({
            contacts: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('cdfiContacts', 'loadError'));
      },
    );
  };

  updateCdfiContact: typeof updateCdfiContact = (cdfiId, userId, data) => {
    return updateCdfiContact(cdfiId, userId, data).then(() =>
      this.reload(cdfiId),
    );
  };

  createCdfiContact: typeof createCdfiContact = (cdfiId, data) => {
    return createCdfiContact(cdfiId, data).then(() => this.reload(cdfiId));
  };
}
