import { useEffect } from 'react';
import { aggregatedMetrics as mgr } from './aggregatedMetrics';
import { useStoreAntiCache } from './useStoreAntiCache';
import { DataHook, AggregatedMetric } from '../types';

type DataType = AggregatedMetric[];

export const useAggregatedMetrics: DataHook<string, DataType> = (
  equationType?: string,
) => {
  useStoreAntiCache(mgr.store);

  useEffect(() => {
    const initWithArg = (params?: string): void => {
      mgr.reloadAggregatedMetrics(params);
    };
    initWithArg(equationType);
  }, [equationType]);
  return mgr.store;
};
