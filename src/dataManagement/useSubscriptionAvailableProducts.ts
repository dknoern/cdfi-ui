import { useState, useEffect, useCallback } from 'react';
import { DataHookResultWithReload, SubscriptionProductStatusVM} from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { dataMan, ManagerName } from './managers';
import { SubscriptionManager } from './managers/SubscriptionManager';

interface SubscriptionAvailableProductsResult extends DataHookResultWithReload {
  data: SubscriptionProductStatusVM | null;
}

const mgr = dataMan.manager(ManagerName.subscriptions) as SubscriptionManager;

export const useSubscriptionAvailableProducts = (
  companyId: number,
  subscriptionId: number,
): SubscriptionAvailableProductsResult => {
  const [data, setData] = useState<SubscriptionAvailableProductsResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const reload = useCallback(() => {
    if (!companyId || !subscriptionId) return;

    setError(false);
    setLoading(true);
    setData(null);

    mgr
      .getAvailableProductsByCompany(companyId, subscriptionId)
      .then(setData)
      .catch(() => {
        notifyUser.error(uiText('subscriptionAvailableProducts', 'loadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId, subscriptionId]);

  useEffect(() => {
    reload();
  }, [companyId, subscriptionId, reload]);

  return { data, isLoading, hasError, reload };
};
