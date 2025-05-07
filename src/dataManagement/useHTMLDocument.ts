import { useCallback, useEffect, useReducer } from 'react';
import { FetchHookResult } from 'types';
import { PlainTextModalFlow } from 'types/plainTextModal';
import { plainTextModals } from 'constants/plainTextModals';
import { parseMD } from 'tools/parseMD';
import { loadDocument } from './operations/documentOperations';
import { dataFetchReducer, ReducerType } from './dataFetchReducer';

type DocumentData = string;
type DocumentResult = FetchHookResult<DocumentData>;

export const useHTMLDocument = (
  flowName: PlainTextModalFlow,
): DocumentResult => {
  const [{ data, isLoading, hasError }, changeState] = useReducer<
    ReducerType<DocumentData>
  >(dataFetchReducer, {
    data: null,
    isLoading: true,
    hasError: false,
  });

  const reload = useCallback(() => {
    loadDocument(plainTextModals[flowName].mdEndpoint)
      .then(({ message }) => {
        changeState(parseMD(message));
      })
      .catch((e) => {
        changeState('error');
        //showAPIError(uiText(flowName, 'loadError'))(e);
      });
  }, [flowName]);

  useEffect(reload, [reload]);

  return {
    data,
    isLoading,
    hasError,
  };
};
