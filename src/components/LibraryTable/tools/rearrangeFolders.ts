import { LibraryTableRowItem } from 'types/libraryTableItem';
import { FolderIdConfig } from 'types/libraryViews';

export const rearrangeFolders = (
  items: LibraryTableRowItem[],
  folderIdConfig: FolderIdConfig,
): LibraryTableRowItem[] => {
  const sortFn = (
    a: LibraryTableRowItem,
    b: LibraryTableRowItem,
  ): -1 | 0 | 1 => {
    if (a.id === folderIdConfig.PERFORMANCE_DATA) return -1;
    if (
      a.id === folderIdConfig.TEMPLATE &&
      b.id !== folderIdConfig.PERFORMANCE_DATA
    )
      return -1;
    return 0;
  };

  return items.sort(sortFn);
};
