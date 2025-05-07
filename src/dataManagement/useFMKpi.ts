import { useEffect, useMemo, useReducer } from 'react';
import {
  Kpi,
  FMKpiRawCompany,
  FMKpiRaw,
  isCompanyKpi,
  FetchHookResultWithReload,
} from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser, booleanReducer } from 'tools';
import {
  fmPortfolioKpiText,
  fmPortfolioCompanyKpiText,
} from 'scenes/Dashboard/constants';
import {
  listFMKpi,
  listFMKpiPortfolio,
  listFMKpiCompany,
} from './operations/kpiOperations';
import {
  initialState,
  dataFetchReducer,
  ReducerType,
} from './dataFetchReducer';

const parseKpi = (kpi: FMKpiRaw | FMKpiRawCompany): Kpi[] => {
  const kpiIsForCompany = isCompanyKpi(kpi);

  return Object.keys(kpi).map((kpiName) => ({
    id: kpiName,
    title: kpiIsForCompany
      ? fmPortfolioCompanyKpiText[kpiName as keyof FMKpiRawCompany]
      : fmPortfolioKpiText[kpiName as keyof FMKpiRaw],
    value: kpiIsForCompany
      ? (kpi as FMKpiRawCompany)[kpiName as keyof FMKpiRawCompany]
      : (kpi as FMKpiRaw)[kpiName as keyof FMKpiRaw],
  }));
};

type DataType = Kpi[];

type Args = {
  portfolioId?: number | null;
  companyId?: number | null;
};

type FetchFn =
  | ((arg: number) => Promise<FMKpiRaw | FMKpiRawCompany>)
  | (() => Promise<FMKpiRaw>);

export const useFMKpi = ({
  portfolioId,
  companyId,
}: Args): FetchHookResultWithReload<DataType> => {
  const [data, dispatch] = useReducer<ReducerType<DataType>>(
    dataFetchReducer,
    initialState,
  );
  const [updateTracker, toggleTracker] = useReducer(booleanReducer, false);

  const fetchFn = useMemo<FetchFn>(() => {
    if (companyId) return listFMKpiCompany;
    if (portfolioId) return listFMKpiPortfolio;

    return listFMKpi;
  }, [companyId, portfolioId]);

  useEffect(() => {
    fetchFn((companyId || portfolioId || undefined) as number)
      .then((res) => dispatch(parseKpi(res)))
      .catch(() => {
        notifyUser.error(uiText('kpi', 'loadFailed'));
        dispatch('error');
      });
  }, [portfolioId, companyId, updateTracker, fetchFn]);

  return Object.assign(data, { reload: toggleTracker });
};
