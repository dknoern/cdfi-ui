import { action, computed, decorate, observable, toJS } from 'mobx';
import { LibraryTableItemType } from 'types';
import { FolderView, GlobalLibrary, DocumentView } from 'types/libraryViews';

type StoreFolder = {
  id: FolderView['id'];
  name: FolderView['name'];
};

type StoreLibrary = {
  id: GlobalLibrary['id'];
  name: GlobalLibrary['name'];
};

type FolderStore = {
  id: FolderView['id'];
  name: FolderView['name'];
};

type TableItem = {
  id: number | string;
  rowKey: number | string;
  type: LibraryTableItemType;
  name: string;
};

const initialGlobalLibrary = {
  id: Date.now(),
  name: '',
  pcCompanies: [],
  folders: [],
};

class GlobalLibraryStore {
  libraries: GlobalLibrary[] | null = null;

  dataLoaded = false;

  selectedLibrary: GlobalLibrary = initialGlobalLibrary;

  folderBreadcrumbMap = new Map<number, FolderStore[]>();

  selectedItems: GlobalLibrary['id'][] = [];

  initWithData = (data: GlobalLibrary[]): void => {
    this.libraries = data;
    this.dataLoaded = true;
  };

  reset = (): void => {
    this.libraries = null;
    this.dataLoaded = false;
    this.folderBreadcrumbMap = new Map<number, FolderStore[]>();
    this.selectedLibrary = initialGlobalLibrary;
  };

  updateSelectedItems = (selectedRowKeys: GlobalLibrary['id'][]): void => {
    this.selectedItems = selectedRowKeys;
  };

  private createBreadcrumbs = (libraryId: GlobalLibrary['id']): void => {
    const library = this.getLibraryData(libraryId);
    library.folders.forEach((folder) => this.createBreadcrumb(folder, []));
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

  resetSelectedLibrary = (): void => {
    this.selectedLibrary = initialGlobalLibrary;
  };

  getLibraryData = (libraryId: GlobalLibrary['id']): GlobalLibrary => {
    return (this.libraries ?? []).find(
      (library) => library.id === libraryId,
    ) as GlobalLibrary;
  };

  getFolderData = (
    libraryId: GlobalLibrary['id'],
    folderId: FolderView['id'],
  ): FolderView => {
    const library = (this.libraries ?? []).find(
      (library) => library.id === libraryId,
    ) as GlobalLibrary;
    return this.findFolderById(library.folders, folderId) as FolderView;
  };

  private findFolderById = (
    folders: FolderView[],
    folderId: FolderView['id'],
  ): FolderView | undefined => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) return folders[i];

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
    for (let i = 0; i < folders.length; i++) {
      for (let j = 0; j < folders[i].documents.length; j++) {
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

  updateLibrariesData = (data: GlobalLibrary[]): void => {
    this.initWithData(data);
  };

  setSelectedLibraryExistingFolders = (
    libraryId: GlobalLibrary['id'],
  ): void => {
    this.selectedLibrary =
      (this.libraries ?? []).find((library) => library.id === libraryId) ??
      initialGlobalLibrary;
  };

  get librariesList(): StoreLibrary[] {
    return toJS(
      (this.libraries ?? []).map((library) => ({
        id: library.id,
        name: library.name,
      })),
    );
  }

  private getFolders = (folder: FolderView): StoreFolder[] => {
    if (!folder.subFolders) return [];
    const currentFolders: StoreFolder[] = [];
    folder.subFolders.forEach((subFolder) => {
      currentFolders.push(
        { id: subFolder.id, name: subFolder.name },
        ...this.getFolders(subFolder),
      );
    });

    return currentFolders;
  };
}

decorate(GlobalLibraryStore, {
  libraries: observable,
  dataLoaded: observable,
  selectedLibrary: observable,
  folderBreadcrumbMap: observable,
  initWithData: action,
  resetSelectedLibrary: action,
  getLibraryData: action,
  getFolderData: action,
  updateLibrariesData: action,
  setSelectedLibraryExistingFolders: action,
  reset: action,
  librariesList: computed,
});

export const globalLibraryStore = new GlobalLibraryStore();
