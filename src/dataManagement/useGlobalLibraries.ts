import { useEffect, useReducer, useCallback } from 'react';
import { DataHookResult, DataHookResultWithReload, VoidFn } from 'types';

import { uiText } from 'constants/uiText';
import { GlobalLibrary } from 'types/libraryViews';
import { showAPIError } from 'tools';
import { useObserver } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import {
  ActionType,
  createDataFetchReducer,
  initialState,
} from './dataFetchReducer';
import { library as libraryManager } from './library';
import {
  AerisLibraryManager,
  AerisLibraryManagerResults,
} from './managers/AerisLibraryManager';
import {
  AerisLibraryViewersManager,
  AerisLibraryViewersManagerResults,
  AerisLibraryDocumentsAccessManager,
  AerisLibraryDocumentsAccessManagerResults,
} from './managers/AerisLibraryViewersManager';
import { dataMan, ManagerName } from './managers';

interface UseGlobalLibrariesResult extends DataHookResultWithReload {
  data: GlobalLibrary[] | null;
}

export const useGlobalLibraries = (): UseGlobalLibrariesResult => {
  const dataFetchReducer =
    createDataFetchReducer<UseGlobalLibrariesResult['data']>();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    dispatch({ type: ActionType.INITIAL_STATE });
    libraryManager
      .getGlobalLibraries()
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('library', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, []);

  useEffect(reload, [reload]);

  return { ...data, reload };
};

// Get AerisLibrary Manager Results Data
type UseAerisLibraryManagerResults = DataHookResult & {
  data: AerisLibraryManagerResults;
};

const mgrAerisLibDocs = dataMan.manager(
  ManagerName.aerisLibraryDocs,
) as AerisLibraryManager;

export const useAerisLibraryData = (
  cdfiId: number,
): UseAerisLibraryManagerResults => {
  const location = useLocation();

  useEffect(() => {
    mgrAerisLibDocs.getAerisLibrary(cdfiId);
  }, [location, cdfiId]);

  return useObserver(() => {
    return {
      ...(mgrAerisLibDocs.store as UseAerisLibraryManagerResults),
    };
  });
};
// Get AerisLibrary ViewersManager Results Data
type UseAerisLibraryViewersManagerResults = DataHookResult & {
  data: AerisLibraryViewersManagerResults;
};

const mgrAerisLibViewers = dataMan.manager(
  ManagerName.aerisLibraryViewersManager,
) as AerisLibraryViewersManager;

export const useAerisLibraryViewers = (
  cdfiId: number,
): UseAerisLibraryViewersManagerResults => {
  const location = useLocation();
  useEffect(() => {
    mgrAerisLibViewers.getAerisLibraryViewers(cdfiId);
  }, [location, cdfiId]);

  return useObserver(() => {
    return {
      ...(mgrAerisLibViewers.store as UseAerisLibraryViewersManagerResults),
    };
  });
};

// Get AerisLibrary DocumentAccess Data
type UseAerisLibraryDocumentsAccessManagerResults = DataHookResult & {
  data: AerisLibraryDocumentsAccessManagerResults;
};

const mgrAerisLibDocumentAccess = dataMan.manager(
  ManagerName.aerisLibraryDocumentsAccessManager,
) as AerisLibraryDocumentsAccessManager;

export const UseAerisLibraryDocumentsAccess = (
  cdfId: number,
  companyId: number,
): UseAerisLibraryDocumentsAccessManagerResults => {
  useEffect(() => {
    mgrAerisLibDocumentAccess.getAerisDocumentsAccess(cdfId, companyId);
  }, [cdfId, companyId]);

  return useObserver(() => {
    return {
      ...(mgrAerisLibDocumentAccess.store as UseAerisLibraryDocumentsAccessManagerResults),
    };
  });
};
