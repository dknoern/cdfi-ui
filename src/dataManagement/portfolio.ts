import { Portfolio, EditPortfolioData } from 'types';
import { uiStore } from 'store';
import { apiProcessor } from 'tools';

class PortfolioManager {
  getById = (portfolioId: Portfolio['id']): Promise<EditPortfolioData> => {
    const OPERATION = 'portfolioByIdV2';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION, portfolioId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  delete = (portfolioId: Portfolio['id']): Promise<void> => {
    const OPERATION = 'portfolioDelete';

    uiStore.addLoading(OPERATION);

    return apiProcessor.delete(OPERATION, portfolioId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };
}

export const portfolio = new PortfolioManager();
