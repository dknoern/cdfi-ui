import { useEffect, useCallback, useReducer } from 'react';
import { Company, DataHookResultWithReload } from 'types';
import { LibraryView } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import {
  createDataFetchReducer,
  initialState,
  ActionType,
} from './dataFetchReducer';
import { library as libraryManager } from './library';

interface UsePCLibraryResult extends DataHookResultWithReload {
  data: LibraryView | null;
}

export const usePCLibrary = (
  companyId: Company['id'],
  libraryId?: LibraryView['id'],
): UsePCLibraryResult => {
  const dataFetchReducer = createDataFetchReducer<UsePCLibraryResult['data']>();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    if (!companyId || !libraryId) return;

    dispatch({ type: ActionType.INITIAL_STATE });
    libraryManager
      .getPCLibrary(companyId, libraryId)
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('metrics', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, [companyId, libraryId]);

  useEffect(() => reload(), [reload, companyId, libraryId]);

  return { ...data, reload };
};
