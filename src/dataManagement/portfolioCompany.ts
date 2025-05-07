import { uiStore } from 'store';
import { apiProcessor } from 'tools';

interface PCModel {
  [key: string]: any;
}
type ResultModel = any;

class PortfolioCompanyManager {
  create = (model: PCModel, portfolioId?: number): Promise<ResultModel> => {
    const OPERATION = 'CREATE_COMPANY';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .post('companyCreateV2', portfolioId, model)
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };
}

export const portfolioCompany = new PortfolioCompanyManager();
