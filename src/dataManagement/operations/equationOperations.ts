import { apiProcessor } from 'tools/apiProcessor';
import {
  AggregatedMetric,
  AggregatedMetricSaveData,
  AggregatedMetricUpdateData,
} from '../../types';
import { uiStore } from '../../store';

export const loadGlobalAggregatedMetrics = (
  type?: string,
): Promise<AggregatedMetric[]> => {
  const OPERATION = 'equationsList';

  uiStore.addLoading(OPERATION);
  return apiProcessor.get('equationsList', { type }).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const createEquation = (
  dto: AggregatedMetricSaveData,
): Promise<void> => {
  const OPERATION = 'equationCreate';
  uiStore.addLoading(OPERATION);

  return apiProcessor.post(OPERATION, null, dto).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const updateEquation = (
  dto: AggregatedMetricUpdateData,
): Promise<void> => {
  const OPERATION = 'equationUpdate';

  uiStore.addLoading(OPERATION);

  return apiProcessor.patch(OPERATION, null, dto).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const deleteEquation = (id: number): Promise<void> => {
  const OPERATION = 'equationDelete';

  uiStore.addLoading(OPERATION);

  return apiProcessor.delete(OPERATION, id).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};
