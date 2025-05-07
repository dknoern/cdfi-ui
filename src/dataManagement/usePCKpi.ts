import { useEffect, useReducer } from 'react';
import { Kpi, PCKpiRaw, FetchHookResult } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { pcKpiText } from 'scenes/Dashboard/constants';
import { listPCKpi } from './operations/kpiOperations';
import {
  initialState,
  dataFetchReducer,
  ReducerType,
} from './dataFetchReducer';

const parseKpi = (kpi: PCKpiRaw): Kpi[] => {
  return Object.keys(kpi).map((kpiName) => {
    const key = kpiName as keyof typeof pcKpiText;

    return {
      id: key,
      title: pcKpiText[key],
      value: kpi[key],
    };
  });
};

type DataType = Kpi[];

export const usePCKpi = (): FetchHookResult<DataType> => {
  const [data, dispatch] = useReducer<ReducerType<DataType>>(
    dataFetchReducer,
    initialState,
  );

  useEffect(() => {
    listPCKpi()
      .then((res) => dispatch(parseKpi(res)))
      .catch(() => {
        notifyUser.error(uiText('kpi', 'loadFailed'));
        dispatch('error');
      });
  }, []);

  return data;
};
