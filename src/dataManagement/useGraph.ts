import { useCallback, useEffect, useReducer } from 'react';
import { Company } from 'types/company';
import { Portfolio } from 'types/portfolio';
import { DataHook } from 'types/hooks';
import { GraphPreviewView } from 'types/graphs';
import { Log } from 'tools';
import {
  dataFetchReducer,
  initialState,
  ReducerType,
} from './dataFetchReducer';
import { graphs } from './graphs';

type UseGraphHookProps = {
  graphId?: number;
  companyId?: Company['id'];
  portfolioId?: Portfolio['id'];
};
type DataType = GraphPreviewView;

type UseGraphHook = DataHook<UseGraphHookProps, DataType>;

export const useGraph: UseGraphHook = (
  { graphId, companyId, portfolioId } = {} as UseGraphHookProps,
) => {
  const [data, dispatch] = useReducer<ReducerType<DataType>>(
    dataFetchReducer,
    initialState,
  );

  const reload = useCallback(() => {
    const fetchFn = companyId
      ? (): ReturnType<typeof graphs.getGraphForCompany> =>
          graphs.getGraphForCompany(graphId ?? 0, companyId)
      : (): ReturnType<typeof graphs.getGraphForForPortfolio> =>
          graphs.getGraphForForPortfolio(graphId ?? 0, portfolioId);

    fetchFn()
      .then(dispatch)
      .catch((e) => {
        Log.error(e);
      });
  }, [companyId, graphId, portfolioId]);

  useEffect(() => {
    if (!graphId) return;
    if (!portfolioId && !companyId) return;

    reload();
  }, [companyId, graphId, portfolioId, reload]);

  return { ...data, reload };
};
