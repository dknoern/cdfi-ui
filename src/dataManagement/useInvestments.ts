import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult, Investment } from 'types';
import { dataMan, ManagerName } from './managers';

type UseInvestmentsResult = DataHookResult & {
  data: Investment[] | null;
};

const mgr = dataMan.manager(ManagerName.investments);

export const useInvestments = (shouldLoad?: boolean): UseInvestmentsResult => {
  useEffect(() => {
    if (shouldLoad) {
      mgr.init();
    }
  }, [shouldLoad]);

  return useObserver(() => mgr.store);
};
