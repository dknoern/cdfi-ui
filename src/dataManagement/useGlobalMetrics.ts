import { useEffect } from 'react';
import { GlobalMetric, DataHook } from 'types';
import { metrics as mgr } from './metrics';
import { useStoreAntiCache } from './useStoreAntiCache';

type DataType = GlobalMetric[];

export const useGlobalMetrics: DataHook<number, DataType> = (
  cdfiId?: number,
) => {
  useStoreAntiCache(mgr.store);

  useEffect(() => {
    const initWithArg = (params?: number): void => {
      mgr.reload(params);
    };
    initWithArg(cdfiId);
  }, [cdfiId]);
  return mgr.store;
};
