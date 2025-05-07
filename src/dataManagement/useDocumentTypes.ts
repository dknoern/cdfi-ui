import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import {
  DocumentTypeManager,
  DocumentTypesResults
} from './managers/DocumentTypeManager';

type UseDcoumentTypesResult = DataHookResult & {
  data: DocumentTypesResults;
};

const mgr = dataMan.manager(ManagerName.documentTypes) as DocumentTypeManager;

export const useDocumentTypes = (cdfiId: number): UseDcoumentTypesResult => {
  useEffect(() => {
    if (cdfiId) {
      mgr.getDocumentTypes(cdfiId);
    }
  }, [cdfiId]);

  return useObserver(() => {
    return { ...(mgr.store as UseDcoumentTypesResult) };
  });
};