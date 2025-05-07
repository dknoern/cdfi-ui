import { useEffect, useCallback, useReducer } from 'react';
import { DataHookResultWithReload } from 'types';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { GlobalLibraryCompanies } from 'types/libraryViews';
import { library as libraryManager } from './library';
import {
  createDataFetchReducer,
  initialState,
  ActionType,
} from './dataFetchReducer';

interface useCompaniesWithoutLibraryResult extends DataHookResultWithReload {
  data: GlobalLibraryCompanies[] | null;
}

export const useCompaniesWithoutLibrary = (): useCompaniesWithoutLibraryResult => {
  const dataFetchReducer = createDataFetchReducer<
    useCompaniesWithoutLibraryResult['data']
  >();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    dispatch({ type: ActionType.INITIAL_STATE });
    libraryManager
      .getCompaniesWithoutLibrary()
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('investments', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, []);

  useEffect(reload, [reload]);

  return { ...data, reload };
};
