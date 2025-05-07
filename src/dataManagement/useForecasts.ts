import { useEffect, useCallback, useReducer } from 'react';
import { DataHookResultWithReload, Company, VoidFn } from 'types';
import { ForecastCard } from 'types/forecast';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { dataMan, ManagerName } from './managers';
import {
  ActionType,
  createDataFetchReducer,
  initialState,
} from './dataFetchReducer';
import { ForecastManager } from './managers/ForecastManager';

type Result = DataHookResultWithReload & {
  data: ForecastCard[] | null;
};

const mgr = dataMan.manager(ManagerName.forecasts) as ForecastManager;

export const useForecasts = (companyId: Company['id']): Result => {
  const dataFetchReducer = createDataFetchReducer<Result['data']>();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback<VoidFn>(() => {
    if (!companyId) return;

    dispatch({ type: ActionType.INITIAL_STATE });

    mgr
      .getByCompany(companyId)
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('forecasts', 'forecastsLoadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, [companyId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return Object.assign(data, { reload });
};
