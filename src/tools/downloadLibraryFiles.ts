import { uiText } from 'constants/uiText';
import { library as libraryManager } from 'dataManagement';
import { showAPIError } from 'tools/APITools';
import { downloadFetchedFile } from 'tools/fileDownloadTools';
import { DocumentView } from 'types/libraryViews';

export const downloadLibraryFiles = (files: DocumentView['id'][]): void => {
  libraryManager
    .downloadFiles(files)
    .then(downloadFetchedFile)
    .catch(showAPIError(uiText('library', 'documentDownloadError')));
};
