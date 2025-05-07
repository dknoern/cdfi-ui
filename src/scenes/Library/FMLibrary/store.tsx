import { action, decorate, observable } from 'mobx';
import { Company, LibraryTableItemType, LibraryStoreTableItem } from 'types';
import { DocumentView, FolderView, GlobalLibrary } from 'types/libraryViews';
import { LibraryStoreBase } from '../LibraryStoreBase';
import { initialFolder } from './constants';

type FolderStore = {
  id: FolderView['id'];
  name: FolderView['name'];
};

class FMLibraryStore extends LibraryStoreBase<GlobalLibrary> {
  companyId: Company['id'] | null = null;

  folderBreadcrumbMap = new Map<number, FolderStore[]>();

  selectedItems: LibraryStoreTableItem[] = [];

  initWithData = (data: GlobalLibrary, companyId: Company['id']): void => {
    this.library = data;
    this.createBreadcrumbs(data.folders);
    this.companyId = companyId;
    this.setFolderIdConfig();
    this.dataLoaded = true;
  };

  updateSelectedItems = (
    selectedRowKeys: LibraryStoreTableItem['rowKey'][],
  ): void => {
    this.selectedItems = selectedRowKeys.map((key) => {
      let libraryElement = null;
      let type = null;

      if ((key as string).includes('doc')) {
        libraryElement = this.getDocument(Number(key.toString().split('-')[1]));
        type = LibraryTableItemType.DOCUMENT;
      } else {
        libraryElement = this.getFolder(Number(key as string));
        type = LibraryTableItemType.FOLDER;
      }

      return {
        id: libraryElement?.id,
        rowKey: key,
        type,
        name: libraryElement?.name,
      };
    });
  };

  private createBreadcrumbs = (library: FolderView[]): void => {
    library.forEach((folder) => this.createBreadcrumb(folder, []));
  };

  updateFoldersData = (data: GlobalLibrary, companyId: Company['id']): void => {
    this.initWithData(data, companyId);
  };

  reset = (): void => {
    this.library = null;
    this.folderBreadcrumbMap = new Map<number, FolderStore[]>();
    this.dataLoaded = false;
    this.companyId = null;
  };

  private createBreadcrumb = (
    folder: FolderView,
    prevFolders: FolderStore[],
  ): void => {
    this.folderBreadcrumbMap.set(folder.id, prevFolders);

    if (folder.subFolders) {
      folder.subFolders.map((subFolder) =>
        this.createBreadcrumb(subFolder, [
          ...prevFolders,
          { id: folder.id, name: folder.name },
        ]),
      );
    }
  };

  getFolder = (folderId: FolderView['id']): FolderView => {
    return (
      (this.library && this.findFolderById(this.library.folders, folderId)) ??
      Object.assign({}, initialFolder)
    );
  };

  getDocument = (documentId: DocumentView['id']): DocumentView => {
    return (
      (this.library &&
        this.findDocumentById(this.library.folders, documentId)) ?? {
        id: 0,
        name: '',
        lastModified: 0,
      }
    );
  };

  private findFolderById = (
    folders: FolderView[],
    folderId: FolderView['id'],
  ): FolderView | undefined => {
    for (let i = 0; i < folders.length; i += 1) {
      if (folders[i].id === folderId) {
        return folders[i];
      }

      if (folders[i].subFolders) {
        const folder = this.findFolderById(folders[i].subFolders, folderId);
        if (folder) {
          return folder;
        }
      }
    }
    return undefined;
  };

  private findDocumentById = (
    folders: FolderView[],
    documentId: DocumentView['id'],
  ): DocumentView | undefined => {
    for (let i = 0; i < folders.length; i += 1) {
      for (let j = 0; j < folders[i].documents.length; j += 1) {
        if (folders[i].documents[j].id === documentId) {
          return folders[i].documents[j];
        }
      }

      if (folders[i].subFolders) {
        const document = this.findDocumentById(
          folders[i].subFolders,
          documentId,
        );

        if (document) {
          return document;
        }
      }
    }
    return undefined;
  };
}

decorate(FMLibraryStore, {
  library: observable,
  folderBreadcrumbMap: observable,
  dataLoaded: observable,
  folderIdConfig: observable,
  initWithData: action,
  getFolder: action,
  getDocument: action,
  updateFoldersData: action,
  reset: action,
  setFolderIdConfig: action,
});

export const libraryStore = new FMLibraryStore();
