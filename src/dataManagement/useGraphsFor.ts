import { useState, useEffect, useCallback } from 'react';
import { DataHookResult, ViewModeConfig, VoidFn } from 'types';
import { GraphMeta } from 'types/graphs';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { graphs } from './graphs';

interface HookResult extends DataHookResult {
  data: GraphMeta[] | null;
  reload: VoidFn;
}

export const useGraphsFor = (config: ViewModeConfig): HookResult => {
  const [data, setData] = useState<HookResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const { companyId, portfolioId } = config;

  const reload = useCallback(() => {
    if (companyId === null) return;
    if (companyId === 0 && portfolioId === null) return;

    graphs
      .getGraphs({
        // change to investment id from store
        investmentId: companyId || null,
        portfolioId,
      })
      .then(setData)
      .catch((e) => {
        showAPIError(uiText('graphs', 'loadError'))(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId, portfolioId]);

  useEffect(reload, [reload, companyId, portfolioId]);

  return { data, isLoading, hasError, reload };
};
