import { useState, useEffect } from 'react';
import { DataHookResult, MetricRequest } from 'types';
import { APIError } from 'types/apiError';
import { apiProcessor } from 'tools';
import { showAPIError } from 'tools/APITools';
import { uiText } from 'constants/uiText';
import { MetricRequestStatus } from 'types/metricRequestStatus';

interface UseMetricRequestResult extends DataHookResult {
  data: MetricRequest[] | null;
}

export const useMetricRequests = (): UseMetricRequestResult => {
  const [data, setData] = useState<UseMetricRequestResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    apiProcessor
      .get('metricReportReportedRequests')
      .then((result: MetricRequest[]) =>
        setData(
          result.filter(
            (item) => item.status === MetricRequestStatus.PENDING_APPROVAL,
          ),
        ),
      )
      .catch((e: APIError) => {
        showAPIError(uiText('reportRequest', 'loadMultiError'))(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, isLoading, hasError };
};
