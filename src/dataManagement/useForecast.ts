import { useEffect, useCallback, useReducer } from 'react';
import { DataHook } from 'types';
import { Forecast } from 'types/forecast';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { dataMan, ManagerName } from './managers';
import {
  initialState,
  dataFetchReducer,
  ReducerType,
} from './dataFetchReducer';

type DataType = Forecast;

const mgr = dataMan.manager(ManagerName.forecasts);

export const useForecast: DataHook<Forecast['id'] | null, DataType> = (id) => {
  // const dataFetchReducer = createDataFetchReducer<Result['data']>();
  const [data, dispatch] = useReducer<ReducerType<DataType>>(
    dataFetchReducer,
    initialState,
  );

  const reload = useCallback(() => {
    if (!id) return;

    dispatch('reset');

    mgr
      .getById(id)
      .then(dispatch)
      .catch((e) => {
        showAPIError(uiText('forecasts', 'forecastDataLoadError'))(e);
        dispatch('error');
      });
  }, [id]);

  useEffect(reload, [reload]);

  return { ...data, reload };
};
