import { useState, useEffect, useCallback } from 'react';
import { Subscription, DataHookResultWithReload } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { dataMan, ManagerName } from './managers';
import { SubscriptionManager } from './managers/SubscriptionManager';

interface SubscriptionsResult extends DataHookResultWithReload {
  data: Subscription[] | null;
}

const mgr = dataMan.manager(ManagerName.subscriptions) as SubscriptionManager;

export const useCompanySubscriptions = (
  companyId: number | null,
): SubscriptionsResult => {
  const [data, setData] = useState<SubscriptionsResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const reload = useCallback(() => {
    if (!companyId) return;

    setError(false);
    setLoading(true);
    setData(null);

    mgr
      .getByCompany(companyId)
      .then(setData)
      .catch(() => {
        notifyUser.error(uiText('subscriptions', 'loadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId]);

  useEffect(() => {
    reload();
  }, [companyId, reload]);

  return { data, isLoading, hasError, reload };
};
