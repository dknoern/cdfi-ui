import { useEffect, useCallback, useReducer } from 'react';
import { DataHookResultWithReload, AssignedMetric, Portfolio } from 'types';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { metrics as metricsManager } from './metrics';
import {
  ActionType,
  createDataFetchReducer,
  initialState,
} from './dataFetchReducer';

interface UsePortfolioMetricsResult extends DataHookResultWithReload {
  data: AssignedMetric[] | null;
}

export const usePortfolioMetrics = (
  portfolioId: Portfolio['id'],
): UsePortfolioMetricsResult => {
  const dataFetchReducer = createDataFetchReducer<
    UsePortfolioMetricsResult['data']
  >();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    dispatch({ type: ActionType.INITIAL_STATE });

    metricsManager
      .getByPortfolio(portfolioId)
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('metrics', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, [portfolioId]);

  useEffect(reload, [portfolioId, reload]);

  return { ...data, reload };
};
