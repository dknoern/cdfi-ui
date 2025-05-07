import { DownloadFileNames } from 'constants/downloadFileNames';
import { cdfiStore } from '../store';

export const getAttachFileName = (
  response,
  fileName = DownloadFileNames.Default,
) => {
  let resultFileName = fileName;
  let disposition = null;

  if (response) {
    disposition = response.headers.get('content-disposition');
  }

  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      resultFileName = matches[1].replace(/['"]/g, '');
    }
  }

  return resultFileName;
};

export const downloadFetchedFile = (
  response,
  fileName = DownloadFileNames.Default,
) => {
  const filename = getAttachFileName(response, fileName);
  const { setIsLoadingDownloadFiles } = cdfiStore;

  response.blob().then((blob) => {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing the URL has been freed."
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const URL = window.URL || window.webkitURL;
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      // safari doesn't support this yet
      if (typeof a.download === 'undefined') {
        window.location = downloadUrl;
      } else {
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      setIsLoadingDownloadFiles(false);
      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 100); // cleanup
    }
  });
};
