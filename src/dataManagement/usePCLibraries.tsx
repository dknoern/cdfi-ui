import { useEffect, useCallback, useReducer } from 'react';
import { DataHookResultWithReload } from 'types';
import { GlobalLibrary } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import {
  createDataFetchReducer,
  initialState,
  ActionType,
} from './dataFetchReducer';
import { library as libraryManager } from './library';

interface UsePCLibrariesResult extends DataHookResultWithReload {
  data: GlobalLibrary[] | null;
}

export const usePCLibraries = (): UsePCLibrariesResult => {
  const dataFetchReducer = createDataFetchReducer<
    UsePCLibrariesResult['data']
  >();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    dispatch({ type: ActionType.INITIAL_STATE });
    libraryManager
      .getGlobalLibraries()
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('metrics', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, []);

  useEffect(reload, [reload]);

  return { ...data, reload };
};
