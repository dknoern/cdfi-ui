import { useEffect, useCallback, useReducer } from 'react';
import {
  DataHookResultWithReload,
  AssignedMetric,
  Company,
  VoidFn,
} from 'types';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { metrics as metricsManager } from './metrics';
import {
  createDataFetchReducer,
  initialState,
  ActionType,
} from './dataFetchReducer';

interface UseCompaniesMetricsResult extends DataHookResultWithReload {
  data: AssignedMetric[] | null;
}

export const useCompanyMetrics = (
  companyId: Company['id'],
): UseCompaniesMetricsResult => {
  const dataFetchReducer = createDataFetchReducer<
    UseCompaniesMetricsResult['data']
  >();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback<VoidFn>(() => {
    if (!companyId) return;

    dispatch({ type: ActionType.INITIAL_STATE });
    metricsManager
      .getByCompany(companyId)
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('metrics', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, [companyId]);

  useEffect(reload, [companyId, reload]);

  return { ...data, reload };
};
