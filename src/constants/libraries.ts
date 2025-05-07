import { LibraryFolderType } from 'types';
import { FolderIdConfig } from 'types/libraryViews';

export const REQUESTED_PERFORMANCE_DATA_FOLDER_ID = 1;
export const DATA_TEMPLATE_FOLDER_ID = 2;
export const UPLOAD_ERROR_FILES_FOLDER_ID = 3;

export const DEFAULT_FOLDER_FILE_EXTENSIONS =
  '.xls,.xlsx,.pdf,.doc,.docx,.png,.img,.ppt,.pptx,.eps';

export const folderIdConfigDefault: FolderIdConfig = {
  [LibraryFolderType.PERFORMANCE_DATA]: REQUESTED_PERFORMANCE_DATA_FOLDER_ID,
  [LibraryFolderType.TEMPLATE]: DATA_TEMPLATE_FOLDER_ID,
  [LibraryFolderType.UPLOAD_ERROR_FILES]: UPLOAD_ERROR_FILES_FOLDER_ID,
  [LibraryFolderType.CUSTOM]: 0,
};
