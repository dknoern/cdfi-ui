import React, { ReactNode } from 'react';
import { VoidFn } from 'types';
import {
  DocumentTableItem,
  FolderTableItem,
  LibraryStoreTableItem,
  LibraryTableColumns,
  LibraryTableItem,
  LibraryTableItemType,
  LibraryTableRow,
} from 'types/libraryTableItem';
import { DocumentView, FolderView } from 'types/libraryViews';
import { Breadcrumbs } from 'components';
import { isUploadDisabled } from 'components/LibraryTable/tools';
import { sortByString } from 'tools';
import { createFolderButton, uploadButton } from 'scenes/Library/tools';
import { libraryStore } from '../store';
import { initialFolder } from '../constants';

export const createBreadcrumbs = (
  rootLink: string,
  folderLink: (folderId: FolderView['id']) => string,
  folder: LibraryTableRow<FolderTableItem | LibraryTableItem>,
  libraryName: string,
): { name: string; id: number; link?: string }[] => [
  {
    id: -1,
    name: libraryName,
    link: rootLink,
  },
  ...(libraryStore.folderBreadcrumbMap.get(folder.id) ?? []).map((item) => ({
    ...item,
    link: folderLink(item.id),
  })),
  { id: folder.id, name: folder.name },
];

export const folders2TableFolderRows = (
  folders: FolderView[],
  type: LibraryTableItemType = LibraryTableItemType.ROOT,
): LibraryTableRow<FolderTableItem>[] => {
  return folders.map((folder) => ({
    ...folder,
    rowKey: `${folder.id}`,
    type,
    children: [
      ...folders2TableFolderRows(
        folder.subFolders ?? [],
        LibraryTableItemType.FOLDER,
      ),
      ...documents2TableDocumentRows(folder.documents ?? []),
    ] as LibraryTableRow<FolderTableItem & DocumentTableItem>[],
  }));
};

export const rootFolder2TableFolderRows = (
  folder: FolderView,
): LibraryTableRow<FolderTableItem> => {
  return {
    ...folder,
    rowKey: `${folder.id}`,
    type: LibraryTableItemType.ROOT,
    children: [
      ...folders2TableFolderRows(folder.subFolders ?? []),
      ...documents2TableDocumentRows(folder.documents ?? []),
    ] as LibraryTableRow<FolderTableItem & DocumentTableItem>[],
  };
};

export const documents2TableDocumentRows = (
  documents: DocumentView[],
): LibraryTableRow<DocumentTableItem>[] => {
  return documents.map((document) => {
    return {
      id: document.id,
      // Need to add unique row key for document files to separate them from folders
      rowKey: `doc-${document.id}`,
      lastModified: document.lastModified,
      name: document.name,
      type: LibraryTableItemType.DOCUMENT,
      reportingPeriod: `${document.fiscalYear}-Q${document.fiscalQuarter}`,
    };
  });
};

export const getTableColumns = (
  library: LibraryTableRow<FolderTableItem | DocumentTableItem>[],
): string[] => {
  return library.find((child) => child.type !== LibraryTableItemType.DOCUMENT)
    ? [
        LibraryTableColumns.NAME,
        LibraryTableColumns.FREQUENCY,
        LibraryTableColumns.LAST_MODIFIED,
        LibraryTableColumns.REPORTING_PERIOD,
      ]
    : [
        LibraryTableColumns.NAME,
        LibraryTableColumns.LAST_MODIFIED,
        LibraryTableColumns.REPORTING_PERIOD,
      ];
};

export const getActionButtons = (
  isRootFolder: boolean,
  library: LibraryTableRow<FolderTableItem>,
  onCreateFolder: VoidFn,
  onFileUpload: VoidFn,
): ReactNode[] => {
  // if library root show only 'create folder' button
  if (isRootFolder) return [createFolderButton(onCreateFolder)];

  // if folder page show 'create folder', 'upload file' buttons
  if (
    library.children &&
    library.children.find(
      (child) =>
        (child as LibraryTableRow<FolderTableItem | DocumentTableItem>).type !==
        LibraryTableItemType.DOCUMENT,
    ) &&
    // support only 2 levels of subfolders
    (libraryStore.folderBreadcrumbMap.get(library.id) ?? []).length < 3
  )
    return [createFolderButton(onCreateFolder), uploadButton(onFileUpload)];

  // if folder is Upload Error Files (no operations allowed)
  if (isUploadDisabled(library.id)) {
    return [];
  }

  // if folder contains only documents then show 'upload file' button
  return [uploadButton(onFileUpload)];
};

export const getTitle = (
  isRootFolder: boolean,
  library: LibraryTableRow<FolderTableItem | LibraryTableItem>,
  rootLink = '',
  getFolderLink: (folderId: FolderView['id']) => string = (): string => '',
): ReactNode => {
  const libraryName = libraryStore.library?.name ?? '';

  return isRootFolder ? (
    libraryName
  ) : (
    <Breadcrumbs
      items={createBreadcrumbs(rootLink, getFolderLink, library, libraryName)}
    />
  );
};

export const getLibrary = (
  folderId: FolderView['id'] | null,
): LibraryTableRow<FolderTableItem> =>
  rootFolder2TableFolderRows(
    !folderId
      ? {
          ...initialFolder,
          subFolders: libraryStore.library?.folders ?? [],
        }
      : libraryStore.getFolder(folderId),
  );

export const getInitialValues4NameEdit = (): Pick<
  LibraryStoreTableItem,
  'id' | 'name'
> => {
  if (libraryStore.selectedItems.length !== 1) return { id: -1, name: '' };

  const { id, name } = libraryStore.selectedItems[0];

  return { id, name };
};

export const getSelectedDocumentsIds = (): DocumentView['id'][] =>
  libraryStore.selectedItems.map((item) => Number(item.id));

export const isRenameDisabled = (): boolean => {
  if (libraryStore.selectedItems.length !== 1) return true;

  return (
    libraryStore.selectedItems[0].type === LibraryTableItemType.FOLDER &&
    (libraryStore.getFolder(
      Number(libraryStore.selectedItems[0].id),
    ) as FolderView).isSystemFolder
  );
};

export const isDeleteDisabled = (): boolean => {
  if (libraryStore.selectedItems.length < 1) return true;

  return libraryStore.selectedItems.some(
    (item) =>
      item.type === LibraryTableItemType.FOLDER &&
      (libraryStore.getFolder(Number(item.id)) as FolderView).isSystemFolder,
  );
};

export const isDownloadDisabled = (): boolean => {
  return (
    libraryStore.selectedItems.length < 1 ||
    libraryStore.selectedItems.some(
      (item) => item.type !== LibraryTableItemType.DOCUMENT,
    )
  );
};

export const isMoveDisabled = (): boolean => {
  const errorFileIds = (
    (libraryStore.library?.folders ?? []).find(
      (folder) => folder.id === libraryStore.folderIdConfig.UPLOAD_ERROR_FILES,
    )?.documents ?? []
  ).map((document) => document.id);

  const isErrorFile = libraryStore.selectedItems.some((item) =>
    errorFileIds?.includes(item.id),
  );

  return isErrorFile || isDownloadDisabled();
};

export const showMoveBtn = (folderId: FolderView['id']): boolean => {
  const folderWithDisabledMove = libraryStore.folderIdConfig.UPLOAD_ERROR_FILES;

  return folderId === folderWithDisabledMove;
};

export const getDeleteModalTitle = (): string => {
  if (libraryStore.selectedItems.length < 2)
    return `'${libraryStore.selectedItems[0].name}'`;

  return 'selected items';
};

type SelectedItemIdsGrouped = {
  folderIds: FolderView['id'][];
  documentIds: DocumentView['id'][];
};

export const getSelectedItemIdsGrouped = (): SelectedItemIdsGrouped => {
  const result: SelectedItemIdsGrouped = {
    folderIds: [],
    documentIds: [],
  };

  libraryStore.selectedItems.forEach((item) => {
    switch (item.type) {
      case LibraryTableItemType.DOCUMENT:
        result.documentIds.push(Number(item.id));
        break;

      case LibraryTableItemType.FOLDER:
      default:
        result.folderIds.push(Number(item.id));
        break;
    }
  });

  return result;
};

export const folderViewToTreeView = (folder: FolderView): any => {
  return {
    title: folder.name,
    key: folder.id,
    children: folder.subFolders
      ? folder.subFolders.map((subFolder) => folderViewToTreeView(subFolder))
      : undefined,
  };
};

export const makeFolderTree = (library: FolderView[]): any => {
  return library
    .map((folder: FolderView) => folderViewToTreeView(folder))
    .sort((a, b) => sortByString(a.title, b.title));
};
