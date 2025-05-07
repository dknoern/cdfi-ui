import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult, Metric } from 'types';
import { dataMan } from './managers';

const mgr = dataMan.managers.metrics;

interface UseMetricsResult extends DataHookResult {
  data: Metric[] | null;
}

export const useMetrics = (): UseMetricsResult => {
  useEffect(mgr.init, []);

  return useObserver(() => mgr.store);
};
