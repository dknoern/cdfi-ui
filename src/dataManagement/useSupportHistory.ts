import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import { SupportHistoryManager, SupportHistoryManagerResults } from './managers/SupportHistoryManager';

type UseSupportHistoryResult = DataHookResult & {
  data: SupportHistoryManagerResults;
};

const mgr = dataMan.manager(ManagerName.supportHistory) as SupportHistoryManager;

export const useSupportHistory = (id?: number): UseSupportHistoryResult => {
  useEffect(() => {
    mgr.getSupportHistory(id);
  }, [id]);

  return useObserver(() => {
    return { ...(mgr.store as UseSupportHistoryResult) };
  });
};