import { useCallback, useEffect, useReducer } from 'react';
import { showAPIError} from 'tools';
import { DataHookResultWithReload, Metric} from "../types";
import {
  ActionType,
  createDataFetchReducer,
  initialState,
} from './dataFetchReducer';
import { metrics as metricsManager} from "./metrics";
import { uiText } from '../constants';

type UseCdfiMetricsResult = DataHookResultWithReload & {
  data: Metric[] | null;
};

export const useCdfiMetrics = (
  cdfiId: number,
  dataset: string,
  showAllYears: boolean | null,
): UseCdfiMetricsResult => {
  const dataFetchReducer = createDataFetchReducer<
    UseCdfiMetricsResult['data']
  >();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    dispatch({ type: ActionType.INITIAL_STATE });

    metricsManager
      .getCdfiMetricsDataset(cdfiId, dataset, showAllYears)
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('metrics', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, [cdfiId, dataset, showAllYears]);

  useEffect(reload, [cdfiId, dataset, showAllYears, reload]);

  return { ...data, reload };
};
