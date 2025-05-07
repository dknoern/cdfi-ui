import { useCallback, useEffect, useReducer } from 'react';
import { DataHook } from 'types';
import { GraphPreviewRequestData, GraphPreviewView } from 'types/graphs';
import { Log } from 'tools/Log';
import { store as chartCreateStore } from 'forms/ChartCreate/store';
import { workDataStore } from 'store';
import {
  dataFetchReducer,
  initialState,
  ReducerType,
} from './dataFetchReducer';
import { graphs } from './graphs';

type HookProps = boolean;
type DataType = GraphPreviewView;

export const useCreatedGraphPreview: DataHook<HookProps, DataType> = (
  forPortfolio,
) => {
  const [{ data, isLoading, hasError }, dispatch] = useReducer<
    ReducerType<DataType>
  >(dataFetchReducer, initialState);

  const { metrics, equations, pcIds } = chartCreateStore.data;
  const { periodStart, periodEnd } = chartCreateStore;
  const { companyId } = workDataStore;

  const reload = useCallback(() => {
    const requestData: GraphPreviewRequestData = {
      ...chartCreateStore.data,
      periodStart,
      periodEnd,
    };

    const fetchFn = forPortfolio
      ? (): ReturnType<typeof graphs.getGraphPreviewByCompanies> =>
          graphs.getGraphPreviewByCompanies(pcIds, requestData)
      : (): ReturnType<typeof graphs.getGraphPreviewByCompany> =>
          graphs.getGraphPreviewByCompany(companyId, requestData);

    fetchFn()
      .then(dispatch)
      .catch((e) => {
        Log.error('Created Graph Preview', e);
      });
  }, [companyId, forPortfolio, pcIds, periodEnd, periodStart]);

  useEffect(() => {
    reload();
  }, [equations, metrics, periodEnd, periodStart, reload]);

  return {
    data,
    isLoading,
    hasError,
    reload,
  };
};
