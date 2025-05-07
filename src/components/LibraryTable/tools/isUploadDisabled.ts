import { libraryStore as FMLibraryStore } from 'scenes/Library/FMLibrary/store';
import { libraryStore as PCLibraryStore } from 'scenes/Library/PCLibrary/store';
import { userStore } from 'store';
import { FolderView } from 'types/libraryViews';

export const isUploadDisabled = (folderId: FolderView['id']): boolean => {
  const { isFM } = userStore;
  const store = isFM ? FMLibraryStore : PCLibraryStore;

  const foldersWithDisabledUpload = [store.folderIdConfig.UPLOAD_ERROR_FILES];
  if (!isFM) foldersWithDisabledUpload.push(store.folderIdConfig.TEMPLATE);

  return foldersWithDisabledUpload.includes(folderId);
};
