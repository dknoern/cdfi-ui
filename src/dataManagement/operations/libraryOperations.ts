import { uiStore, cdfiStore } from 'store';
import { Company } from 'types';
import React from 'react';
import {
  apiProcessor,
  makeFetch,
  showAPIError,
  performRequest,
  notifyUser,
} from 'tools';
import { downloadFetchedFile } from 'tools/fileDownloadTools';
import { uiText } from 'constants/uiText';

export const getAerisLibrary = (cdfiId?: number): Promise<any> => {
  const OPERATION = 'aerisLibrary';
  uiStore.addLoading(OPERATION);

  return apiProcessor.get(OPERATION, cdfiId).finally(() => {
    uiStore.endLoading(OPERATION);
  });
};

export const downloadLibDocument = (
  endpoint: string,
  filename: string,
  cdfiId: number
): Promise<void> => {
  const {setIsLoadingDownloadFiles, setIsErrorMessageDownloadFiles} = cdfiStore;

  return makeFetch({
    url: apiProcessor.makeEndpoint(endpoint, {cdfiId: cdfiId, filename: filename}),
  })
    .then((response) => {
      downloadFetchedFile(response);
    })
    .catch((e) => {
    setIsLoadingDownloadFiles(false);
      setIsErrorMessageDownloadFiles(true);
    showAPIError(uiText('libraryError', 'loadError'))
  });
};

export const setDocApproval = (
  docId: number,
  payload: { setApproved: boolean },
) => {
  return apiProcessor
    .patch('setApproveDocument', docId, payload)
    .then((response) => {
      notifyUser.ok(uiText('library', 'updateDocApprovalStatusOk'));
      return response;
    })
    .catch(showAPIError(uiText('libraryError', 'loadError')));
};

export const updateLibraryDocumentsAccess = (
  cdfiId: number,
  companyId: number | undefined,
  data: any,
): Promise<void> => {
  return performRequest<void>('aerisLibraryDocumentsAccess', (operationName) =>
    apiProcessor.put(operationName, { cdfiId, companyId }, data).then((res) => {
      if (res) {
        notifyUser.ok(uiText('cdfiRatings', 'updateOk'));
      }
    }),
  ).catch((error) => notifyUser.error(uiText('cdfiRatings', 'createError')));
};
