import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult, Company } from 'types';
import { dataMan } from './managers';

type UseCompaniesResult = DataHookResult & {
  data: Company[] | null;
};

const mgr = dataMan.managers.reportingEntity;

export const useCompanies = (shouldLoad?: boolean): UseCompaniesResult => {
  useEffect(() => {
    if (shouldLoad) {
      mgr.init();
    }
  }, [shouldLoad]);

  return useObserver(() => mgr.store);
};
