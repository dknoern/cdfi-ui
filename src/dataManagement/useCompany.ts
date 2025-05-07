import { useState, useEffect, useCallback } from 'react';
import { DataHookResult, Investment, VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { dataMan } from './managers';

interface UseCompanyResult extends DataHookResult {
  data: Investment | null;
  reload: VoidFn;
}

const mgr = dataMan.managers.investments;

// works with RE
export const useCompany = (id?: Investment['id'] | null): UseCompanyResult => {
  const [data, setData] = useState<UseCompanyResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const reload = useCallback(() => {
    if (!id) return;

    mgr
      .getById(id)
      .then(setData)
      .catch(() => {
        notifyUser.error(uiText('investments', 'oneLoadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(reload, [id, reload]);

  return { data, isLoading, hasError, reload };
};
