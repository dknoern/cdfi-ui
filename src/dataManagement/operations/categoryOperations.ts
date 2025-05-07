import { apiProcessor } from 'tools/apiProcessor';
import { MetricCategory } from 'types';
import { uiStore } from 'store/uiStore';

export const loadAll = (): Promise<MetricCategory[]> => {
  const OPERATION = 'metricCategoryAll';

  uiStore.addLoading(OPERATION);

  return apiProcessor.get(OPERATION).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const create = (
  category: Pick<MetricCategory, 'name' | 'parentId'>,
): Promise<void> => {
  const OPERATION = 'addMetricCategory';

  uiStore.addLoading(OPERATION);

  return apiProcessor.post(OPERATION, null, category).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const update = (
  categoryId: MetricCategory['id'],
  category: MetricCategory,
): Promise<void> => {
  const OPERATION = 'editMetricCategory';

  uiStore.addLoading(OPERATION);

  return apiProcessor.patch(OPERATION, categoryId, category).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const remove = (id: MetricCategory['id']): Promise<void> => {
  const OPERATION = 'disableMetricCategory';

  uiStore.addLoading(OPERATION);

  return apiProcessor.delete(OPERATION, id).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};
