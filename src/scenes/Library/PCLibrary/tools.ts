import React from 'react';
import { Company } from 'types';
import { DocumentView, LibraryView } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { library as libraryManager } from 'dataManagement';
import { showAPIError } from 'tools';
import { libraryStore } from './store';

export const getSelectedDocumentsIds = (
  selectedTableItems: React.Key[],
): DocumentView['id'][] =>
  (selectedTableItems as string[]).map((id) => Number(`${id}`.split('-')[1]));

export const loadPCLibrary = (
  companyId: Company['id'],
  setError: (state: boolean) => void,
  libraryId?: LibraryView['id'],
): Promise<void> => {
  return libraryManager
    .getPCLibrary(companyId, libraryId)
    .then(libraryStore.initWithData)
    .catch((e) => {
      libraryStore.reset();
      showAPIError(uiText('library', 'loadError'))(e);
      setError(true);
    });
};
