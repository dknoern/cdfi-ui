import { useEffect } from 'react';
import { DataHookResult, AcceptedMetric } from 'types';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import { dataMan, ManagerName } from './managers';

const mgr = dataMan.manager(ManagerName.acceptedMetrics);

interface UseAcceptedMetricsResult extends DataHookResult {
  data: AcceptedMetric[] | null;
}

export const useAcceptedMetrics = (): UseAcceptedMetricsResult => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => toJS(mgr.store));
};
