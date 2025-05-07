import { CdfiSubscription } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { getCdfiSubscriptions} from '../operations/cdfiSubscriptionsOperations';
import { ManagerDefault } from './ManagerDefault';

export interface CdfiSubscriptionsManagerResults {
  cdfiSubscriptions: CdfiSubscription[]
}

export class CdfiSubscriptionsManager extends ManagerDefault<CdfiSubscriptionsManagerResults> {
  reload = (companyId?: number): void => {
    if (!companyId) return;
    this.getCdfiSubscriptions(companyId);
  };

  getCdfiSubscriptions = (companyId: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCdfiSubscriptions(companyId)]).then(
          (values): CdfiSubscriptionsManagerResults => ({
            cdfiSubscriptions: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('cdfiSubscriptions', 'loadError'));
      },
    );
  };
}