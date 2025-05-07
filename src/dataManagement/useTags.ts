import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult, TagCategory } from 'types';
import { dataMan } from './managers';

const mgr = dataMan.managers.tags;

interface Result extends DataHookResult {
  data: TagCategory[] | null;
}

export const useTags = (): Result => {
  useEffect(mgr.init, []);

  return useObserver(() => mgr.store);
};
