import { useEffect, useCallback, useReducer } from 'react';
import { DataHookResultWithReload, GlobalTag } from 'types';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools';
import { tags as tagsManager } from './tags';
import {
  createDataFetchReducer,
  initialState,
  ActionType,
} from './dataFetchReducer';

interface UseMetricsAndCompaniesTagsResult extends DataHookResultWithReload {
  data: GlobalTag[] | null;
}

export const useMetricsAndCompaniesTags = (): UseMetricsAndCompaniesTagsResult => {
  const dataFetchReducer = createDataFetchReducer<
    UseMetricsAndCompaniesTagsResult['data']
  >();
  const [data, dispatch] = useReducer(dataFetchReducer, initialState);

  const reload = useCallback(() => {
    dispatch({ type: ActionType.INITIAL_STATE });
    tagsManager
      .getMetricsAndCompaniesTags()
      .then((result) => {
        dispatch({ type: ActionType.FETCHED, payload: result });
      })
      .catch((e) => {
        showAPIError(uiText('tags', 'loadError'))(e);
        dispatch({ type: ActionType.FETCH_ERROR });
      });
  }, []);

  useEffect(reload, [reload]);

  return { ...data, reload };
};
