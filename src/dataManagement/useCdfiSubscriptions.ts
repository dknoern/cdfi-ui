import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult, VoidFn } from 'types';
import { dataMan, ManagerName } from './managers';
import {
  CdfiSubscriptionsManager,
  CdfiSubscriptionsManagerResults,
} from './managers/CdfiSubscriptionsManager';

type UseCdfiSubscriptionsResult = DataHookResult & {
  data: CdfiSubscriptionsManagerResults;
  reload: VoidFn;
};

const mgr = dataMan.manager(
  ManagerName.cdfiSubscriptions,
) as CdfiSubscriptionsManager;

export const useCdfiSubscriptions = (
  companyId: number,
): UseCdfiSubscriptionsResult => {
  useEffect(() => {
    mgr.getCdfiSubscriptions(companyId);
  }, [companyId]);

  return useObserver(() => {
    return {
      ...mgr.store,
      reload: () => {
        mgr.reload(companyId);
      },
    } as UseCdfiSubscriptionsResult;
  });
};