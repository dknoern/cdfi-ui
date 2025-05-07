import { action, decorate, observable } from 'mobx';
import { LibraryView, GlobalLibrary } from 'types/libraryViews';
import { folderIdConfigDefault } from 'constants/libraries';

type Library = LibraryView | GlobalLibrary;

export class LibraryStoreBase<T extends Library> {
  library: T | null = null;

  folderIdConfig = folderIdConfigDefault;

  dataLoaded = false;

  setFolderIdConfig = (): void => {
    const newConfig = Object.assign({}, this.folderIdConfig);
    (this.library as T).folders
      .filter((folder) => folder.isSystemFolder)
      .forEach((folder) => {
        newConfig[folder.folderType] = folder.id;
      });

    this.folderIdConfig = newConfig;
  };
}

decorate(LibraryStoreBase, {
  library: observable,
  folderIdConfig: observable,
  dataLoaded: observable,
  setFolderIdConfig: action,
});
