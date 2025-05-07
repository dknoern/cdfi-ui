import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import {
  AllAnalystsManager,
  AllAnalystsResults,
} from './managers/AllAnalystsManager';

const mgrAllAnalysts = dataMan.manager(
  ManagerName.allAnalysts,
) as AllAnalystsManager;

type UseAllAnalystsResult = DataHookResult & {
  data: AllAnalystsResults;
};

export const useAllAnalysts = () => {
  useEffect(() => {
    mgrAllAnalysts.getAllAnalysts();
  }, []);

  return useObserver(() => {
    return { ...(mgrAllAnalysts.store as UseAllAnalystsResult) };
  });
};
