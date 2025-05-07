import { apiProcessor, makeFetch } from 'tools';
import { DocumentContent } from 'types/plainTextModal';
import { DownloadFileNames } from 'constants/downloadFileNames';
import { downloadFetchedFile } from 'tools/fileDownloadTools';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { uiStore } from 'store';

export const loadDocument = (
  fileEndpoint: string,
): Promise<DocumentContent> => {
  return apiProcessor.get(fileEndpoint);
};

export const downloadStaticDocument = (
  filename: string,
  downloadFileName: DownloadFileNames,
): Promise<void> => {
  return makeFetch({
    url: apiProcessor.makeEndpoint(filename),
    contentType: 'plain/text; charset=x-user-defined',
    data: null,
  }).then((response) => {
    downloadFetchedFile(response, downloadFileName);
  });
};

export const downloadStaticDocumentParameter = (
  endpoint: string,
  idObj: any,
  message: string,
): Promise<void> => {
  uiStore.addLoading(endpoint);
  return makeFetch({
    url: apiProcessor.makeEndpoint(endpoint, idObj),
    contentType: 'plain/text; charset=x-user-defined',
    data: null,
  })
    .then((response) => {
      downloadFetchedFile(response);
      notifyUser.ok(uiText(message, 'downloadOk'));
      uiStore.endLoading(endpoint);
    })
    .catch(() => {
      notifyUser.error(uiText(message, 'downloadError'))
      uiStore.endLoading(endpoint);
    });
};

export const downloadImage = (
  endpoint: string,
  filename: string,
  downloadFileName: DownloadFileNames,
): Promise<void> => {
  return makeFetch({
    url: apiProcessor.makeEndpoint(endpoint, filename),
    contentType: 'image/jpeg; charset=x-user-defined',
    data: null,
  })
    .then((response) => {
      downloadFetchedFile(response, downloadFileName);
    })
    .catch((error) => {
      console.log('Error downloading image: ', error);
    });
};
