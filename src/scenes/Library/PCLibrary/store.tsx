import { action, decorate, observable } from 'mobx';
import { LibraryView } from 'types/libraryViews';
import { LibraryStoreBase } from '../LibraryStoreBase';

class PCLibraryStore extends LibraryStoreBase<LibraryView> {
  initWithData = (data: LibraryView): void => {
    this.library = data;
    this.setFolderIdConfig();
    this.dataLoaded = true;
  };

  reset = (): void => {
    this.library = null;
    this.dataLoaded = false;
  };
}

decorate(PCLibraryStore, {
  library: observable,
  folderIdConfig: observable,
  dataLoaded: observable,
  initWithData: action,
  setFolderIdConfig: action,
});

export const libraryStore = new PCLibraryStore();
