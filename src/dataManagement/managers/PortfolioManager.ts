import { Portfolio } from 'types';
import { uiText } from 'constants/uiText';
import { apiProcessor } from 'tools/apiProcessor';
import { notifyUser } from 'tools/notifyUser';
import { userStore } from 'store/userStore';
import { uiStore } from 'store/uiStore';
import { FormSaveModel } from 'forms/PortfolioSetup/types';
import {
  listPortfolios,
  getPortfolioById,
} from '../operations/portfolioOperations';
import { ManagerDefault } from './ManagerDefault';

export class PortfolioManager extends ManagerDefault<Portfolio[]> {
  reload = (ownerId?: number): void => {
    this.proceedReload(
      () => listPortfolios(ownerId || (userStore.userInfo as any).companyId),
      () => notifyUser.error(uiText('portfolios', 'loadError')),
    );
  };

  getById = (id: number): Promise<Portfolio> => {
    return getPortfolioById(id);
  };

  create = (data: FormSaveModel): Promise<void> => {
    return apiProcessor.post('portfolioCreateV2', null, data);
  };

  update = (
    portfolioId: Portfolio['id'],
    data: FormSaveModel,
  ): Promise<void> => {
    const OPERATION = 'updatePortfolio';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, portfolioId, data).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };
}
