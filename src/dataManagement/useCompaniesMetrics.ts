import { useEffect, useCallback, useReducer, useRef } from 'react';
import { Metric, DataHookResultWithReload, Company, GlobalMetric } from 'types';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { metrics as metricsManager } from './metrics';
import {
  initialState,
  dataFetchReducer,
  ReducerType,
} from './dataFetchReducer';

type DataType = GlobalMetric[];
interface UseCompaniesMetricsResult extends DataHookResultWithReload {
  data: DataType | null;
}

const prepareIds2Compare = (array: Company['id'][]): string => {
  return array.slice().sort().join(',');
};

export const useCompaniesMetrics = (
  companyIds: Company['id'][],
): UseCompaniesMetricsResult => {
  const [data, dispatch] = useReducer<ReducerType<DataType>>(
    dataFetchReducer,
    initialState,
  );
  const companyIdsRef = useRef<Company['id'][]>([]);

  const reload = useCallback(() => {
    dispatch('reset');

    companyIdsRef.current = companyIds;

    metricsManager
      .getByCompanies(companyIds)
      .then((result) => {
        dispatch(result as Metric[]);
      })
      .catch((e) => {
        showAPIError(uiText('metrics', 'loadError'))(e);
        dispatch('error');
      });
  }, [companyIds]);

  useEffect(() => {
    if (
      prepareIds2Compare(companyIdsRef.current) ===
      prepareIds2Compare(companyIds)
    )
      return;

    reload();
  }, [companyIds, reload]);

  return { ...data, reload };
};
