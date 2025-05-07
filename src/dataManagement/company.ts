import { FMCompanyCard, Company, Tag } from 'types';
import { apiProcessor } from 'tools';
import { uiStore } from 'store';

class CompanyManager {
  getFMCompanies = (): Promise<FMCompanyCard[]> => {
    const OPERATION = 'fmCompaniesList';

    //uiStore.addLoading(OPERATION);

    //return apiProcessor.get(OPERATION).finally(() => {
    //  uiStore.endLoading(OPERATION);
    //});
    return Promise.resolve([]);
  };

  getCompaniesByTags = (tagIds: Tag['id'][]): Promise<Company[]> => {
    const OPERATION = 'companiesByTags';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION, tagIds.join(',')).finally(() => {
      uiStore.endLoading(OPERATION);
    });
    return Promise.resolve([]);
  };
}

export const company = new CompanyManager();
