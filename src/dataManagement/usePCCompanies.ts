import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Company, DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';

type UsePCCompaniesResult = DataHookResult & {
  data: Company[] | null;
};

const mgr = dataMan.manager(ManagerName.pcCompanies);

export const usePCCompanies = (): UsePCCompaniesResult => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => {
    return { ...(mgr.store as UsePCCompaniesResult) };
  });
};
