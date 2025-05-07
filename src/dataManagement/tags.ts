import { uiStore } from 'store';
import { apiProcessor } from 'tools';

class TagsManager {
  getMetricsAndCompaniesTags = (): Promise<any> => {
    const OPERATION = 'getMetricsAndCompaniesTags';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };
}

export const tags = new TagsManager();
