import { AerisLibraryType } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { ManagerDefault } from './ManagerDefault';
import {
  getAerisLibrary,
  updateLibraryDocumentsAccess,
} from '../operations/libraryOperations';

export interface AerisLibraryManagerResults {
  documents: AerisLibraryType;
}

export class AerisLibraryManager extends ManagerDefault<AerisLibraryManagerResults> {
  reload = (cdfiId?: number): void => {
    this.getAerisLibrary(cdfiId);
  };

  getAerisLibrary = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getAerisLibrary(cdfiId)]).then(
          (values): AerisLibraryManagerResults => ({
            documents: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('libraryError', 'loadError'));
      },
    );
  };
}
