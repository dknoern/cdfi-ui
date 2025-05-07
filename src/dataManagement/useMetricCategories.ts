import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { MetricCategory } from 'types';
import { DataHook } from 'types/hooks';
import { dataMan, ManagerName } from './managers';

type DataType = MetricCategory[];

const mgr = dataMan.manager(ManagerName.metricCategories);

export const useMetricCategories: DataHook<undefined, DataType> = () => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => mgr.store);
};
