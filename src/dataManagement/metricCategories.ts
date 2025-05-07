import { uiStore } from 'store';
import { apiProcessor } from 'tools';
import { MetricCategory } from 'types';

class MetricCategoryManager {
  getAll = (): Promise<MetricCategory[]> => {
    const OPERATION = 'metricCategoryAll';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };
}

export const metricCategories = new MetricCategoryManager();
