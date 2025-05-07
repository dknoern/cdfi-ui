import { FolderIdConfig } from 'types/libraryViews';
import {
  LibraryTableRowItem,
  FolderTableItem,
  isFolderTableItem,
} from 'types/libraryTableItem';
import { folderIdConfigDefault } from 'constants/libraries';

export const tableRows2FolderIdConfig = (
  tableRows: LibraryTableRowItem[],
): FolderIdConfig => {
  const folderIdConfig = folderIdConfigDefault;

  tableRows.filter(isFolderTableItem).forEach((folder) => {
    folderIdConfig[(folder as FolderTableItem).folderType] = folder.id;
  });

  return folderIdConfig;
};
