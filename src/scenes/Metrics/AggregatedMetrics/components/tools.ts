import { Store } from 'antd/lib/form/interface';
import { uiText } from 'constants/uiText';
import { aggregatedMetrics as metricsManager } from 'dataManagement/aggregatedMetrics';
import { showAPIError } from 'tools';
import {
  AggregatedMetricSaveData,
  AggregatedMetricUpdateData,
} from '../../../../types';

export const addAggregatedMetric = (values: Store): Promise<void> => {
  return metricsManager.createAggregatedMetric({
    ...(values as AggregatedMetricSaveData),
  });
};

export const updateAggregatedMetric = (values: Store): Promise<void> => {
  return metricsManager.updateAggregatedMetric({
    ...(values as AggregatedMetricUpdateData),
  });
};

export const deleteAggregatedMetrics = (id: number): Promise<void> => {
  return metricsManager
    .deleteAggregatedMetric(id)
    .catch(showAPIError(uiText('metrics', 'deleteError')));
};
