import { useState, useEffect, useReducer } from 'react';
import { uiText } from 'constants/uiText';
import { Portfolio, DataHookResultWithReload } from 'types';
import { notifyUser, booleanReducer } from 'tools';
import { dataMan, ManagerName } from './managers';
import { PortfolioManager } from './managers/PortfolioManager';

interface UsePortfolioResult extends DataHookResultWithReload {
  data: Portfolio | null;
}

const mgr = dataMan.manager(ManagerName.portfolios) as PortfolioManager;

export const usePortfolio = (id?: number): UsePortfolioResult => {
  const [data, setData] = useState<UsePortfolioResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [updateTracker, toggleTracker] = useReducer(booleanReducer, false);

  useEffect(() => {
    if (!id) return;

    mgr
      .getById(id)
      .then(setData)
      .catch(() => {
        notifyUser.error(uiText('portfolios', 'oneLoadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, updateTracker]);

  return { data, isLoading, hasError, reload: toggleTracker };
};
