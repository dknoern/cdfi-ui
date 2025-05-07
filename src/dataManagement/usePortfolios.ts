import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResultWithReload, Portfolio } from 'types';
import { dataMan, ManagerName } from './managers';

type UsePortfoliosResult = DataHookResultWithReload & {
  data: Portfolio[] | null;
};

const mgr = dataMan.manager(ManagerName.portfolios);

export const usePortfolios = (
  ownerId: number,
  shouldLoad?: boolean,
): UsePortfoliosResult => {
  useEffect(() => {
    if (shouldLoad) {
      mgr.init();
    }
  }, [shouldLoad]);

  return useObserver(() => ({ ...mgr.store, reload: mgr.reload }));
};
