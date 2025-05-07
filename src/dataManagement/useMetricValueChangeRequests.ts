import { useEffect } from 'react';
import { DataHookResult } from 'types';
import { MetricValueChangeRequest } from 'types/metricValue';
import { MVCRStore } from 'store/MVCRStore';

interface UseMetricRequestResult extends DataHookResult {
  data: MetricValueChangeRequest[] | null;
}
export const useMetricValueChangeRequests = (
  companyId: number | null,
  shouldLoad?: boolean,
): UseMetricRequestResult => {
  useEffect(() => {
    if (shouldLoad) MVCRStore.init();
  }, [shouldLoad]);

  return MVCRStore.storeObject;
};
