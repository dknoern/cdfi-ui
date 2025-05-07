import { FolderView, GlobalLibrary } from 'types/libraryViews';
import {
  LibraryTableItemType,
  LibraryTableRowFileItem,
  LibraryTableRowLibItem,
} from 'types/libraryTableItem';
import { globalLibraryStore } from '../store';

export const folders2TableFolderRows = (
  folders: FolderView[],
  type: LibraryTableItemType = LibraryTableItemType.ROOT,
): LibraryTableRowFileItem[] => {
  return folders.map((folder) => ({
    ...folder,
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

export const rootFolder2TableFolderRows = (
  folder: FolderView,
): LibraryTableRowFileItem => {
  return {
    ...folder,
    rowKey: `${folder.id}`,
    type: LibraryTableItemType.ROOT,
    children: [
      ...folders2TableFolderRows(folder.subFolders ?? []),
    ] as LibraryTableRowFileItem[],
  };
};

export const library2TableLibraryRows = (
  library: GlobalLibrary,
): LibraryTableRowLibItem => {
  return {
    id: library.id,
    rowKey: `${library.id}`,
    name: library.name,
    type: LibraryTableItemType.LIBRARY,
    pcCompanies: library.pcCompanies,
    children: [
      ...folders2TableFolderRows(library.folders ?? []),
    ] as LibraryTableRowFileItem[],
  };
};

export const getLibrary = (
  libraryId: GlobalLibrary['id'],
  folderId?: FolderView['id'],
): LibraryTableRowFileItem | LibraryTableRowLibItem =>
  folderId
    ? rootFolder2TableFolderRows(
        globalLibraryStore.getFolderData(libraryId, folderId),
      )
    : library2TableLibraryRows(globalLibraryStore.getLibraryData(libraryId));

export const globalLibraries4GlobalLibraryRows = (
  libraries: GlobalLibrary[],
): LibraryTableRowLibItem[] => {
  return libraries.map((library) => {
    return {
      id: library.id,
      name: library.name,
      pcCompanies: library.pcCompanies,
      type: LibraryTableItemType.LIBRARY,
      rowKey: `${library.id}`,
      children: folders2TableFolderRows(library.folders) as any[],
    };
  });
};

export const isDeleteDisabled = (libraryId: GlobalLibrary['id']): boolean => {
  if (globalLibraryStore.selectedItems.length < 1) return true;

  if (
    globalLibraryStore.selectedItems.some(
      (id) =>
        globalLibraryStore.getFolderData(libraryId, Number(id)).isSystemFolder,
    )
  )
    return true;

  return false;
};

export const getDeleteModalTitle = (libraryId: GlobalLibrary['id']): string => {
  if (globalLibraryStore.selectedItems.length < 2)
    return `'${
      globalLibraryStore.getFolderData(
        libraryId,
        globalLibraryStore.selectedItems[0],
      ).name
    }'`;

  return 'selected folders';
};

export const getSelectedItemIdsGrouped = (): GlobalLibrary['id'][] => {
  return globalLibraryStore.selectedItems;
};
