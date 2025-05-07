import { SortResult } from 'types';
import { LibraryTableRowItem } from 'types/libraryTableItem';
import { FolderIdConfig } from 'types/libraryViews';
import { sortByName } from 'tools';

interface AntSorterFn {
  (
    a: LibraryTableRowItem,
    b: LibraryTableRowItem,
    sortOrder: 'ascend' | 'descend' | null | undefined,
  ): SortResult;
}

// specific sorter
// due to 2 main folders
export const makeNameSorter = (folderIdConfig: FolderIdConfig): AntSorterFn => {
  return (a, b, sortOrder): SortResult => {
    switch (true) {
      case a.id === folderIdConfig.PERFORMANCE_DATA:
        return sortOrder === 'ascend' ? -1 : 1;
      case b.id === folderIdConfig.PERFORMANCE_DATA:
        return sortOrder === 'ascend' ? 1 : -1;
      case a.id === folderIdConfig.TEMPLATE:
        return sortOrder === 'ascend' ? -1 : 1;
      case b.id === folderIdConfig.TEMPLATE:
        return sortOrder === 'ascend' ? 1 : -1;
      default:
        return sortByName(a, b);
    }
  };
};
