import { Store } from 'antd/lib/form/interface';
import { AssignedMetric, Metric } from 'types';
import { uiText } from 'constants/uiText';
import { metrics as metricsManager } from 'dataManagement/metrics';
import { extractTagsIds } from 'tools/tagsTool';
import { notifyUser, showAPIError } from 'tools';

export const addGlobalMetric = (values: Store): Promise<void> => {
  return metricsManager.saveGlobalMetric({
    ...(values as AssignedMetric),
    tags: extractTagsIds(values.tags),
  });
};

export const updateGlobalMetric = (
  metricId: Metric['id'],
  values: Store,
): Promise<void> => {
  return metricsManager.updateGlobalMetric({
    ...(values as AssignedMetric),
    tags: extractTagsIds(values.tags),
    id: metricId,
  });
};

export const updateGlobalMetricsBatch = (
  metricIds: Metric['id'][],
  values: Store,
): Promise<void> => {
  return metricsManager
    .updateGlobalMetricsBatch({
      ...values,
      metricIds,
    })
    .then(() => {
      notifyUser.ok(uiText('metrics', 'updateOk'));
    })
    .catch(showAPIError(uiText('metrics', 'updateError')));
};

export const deleteGlobalMetricsBatch = (
  metricIds: Metric['id'][],
): Promise<void> => {
  return metricsManager
    .delete({ metricIds })
    .then(() => {
      notifyUser.ok(uiText('metrics', 'deleteOkBatch'));
    })
    .catch(showAPIError(uiText('metrics', 'deleteErrorBatch')));
};
