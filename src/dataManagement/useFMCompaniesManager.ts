import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { FMCompanyCard, DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';

type UseFMCompaniesResult = DataHookResult & {
  data: FMCompanyCard[] | null;
};

const mgr = dataMan.manager(ManagerName.fmCompanies);

export const useFMCompaniesManager = (): UseFMCompaniesResult => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => {
    return { ...(mgr.store as UseFMCompaniesResult) };
  });
};
