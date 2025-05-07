import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import { EmailCategoriesManager } from './managers/EmailManager';

// Get Email Categories Results Data
type UseEmailCategoriesManagerResults = DataHookResult & {
  data: any; // get it from manager
};

const mgr = dataMan.manager(
  ManagerName.emailCategories,
) as EmailCategoriesManager;

export const useEmailCategoriesData = (): UseEmailCategoriesManagerResults => {
  useEffect(() => {
    mgr.getEmailCategories();
  }, []);

  return useObserver(() => {
    return {
      ...(mgr.store as UseEmailCategoriesManagerResults),
    };
  });
};
