import { useCallback, useEffect, useReducer } from 'react';
import { DataHookResultWithReload } from 'types';
import { GlobalLibrary, LibraryView } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import {
  ActionType,
  createDataFetchReducer,
  initialState,
} from './dataFetchReducer';
import { library as libraryManager } from './library';

interface UseLibraryFoldersResult extends DataHookResultWithReload {
  data: LibraryView | null;
}

export const useLibraryFolders = (
  libraryId?: GlobalLibrary['id'] | null,
): UseLibraryFoldersResult => {
  const dataFetchReducer = createDataFetchReducer<
    UseLibraryFoldersResult['data']
  >();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    if (!libraryId) return;

    dispatch({ type: ActionType.INITIAL_STATE });
    libraryManager
      .getGlobalLibrary(libraryId)
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('library', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, [libraryId]);

  useEffect(reload, [reload, libraryId]);

  return { ...data, reload };
};
