import {
  LibraryTableItemType,
  LibraryTableRowFileItem,
} from 'types/libraryTableItem';
import { FolderView } from 'types/libraryViews';

export const folders2TableFolderRows = (
  folders: FolderView[],
  type: LibraryTableItemType = LibraryTableItemType.ROOT,
): LibraryTableRowFileItem[] => {
  return folders.map((folder) => ({
    ...folder,
    key: folder.id,
    rowKey: `${folder.id}`,
    type,
    pcCompanies: [],
    children: [
      ...folders2TableFolderRows(
        folder.subFolders ?? [],
        LibraryTableItemType.FOLDER,
      ),
    ] as LibraryTableRowFileItem[],
  }));
};
