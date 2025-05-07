import { AerisLibraryViewer } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { library as libraryManager } from 'dataManagement';
import { ManagerDefault } from './ManagerDefault';

export interface AerisLibraryViewersManagerResults {
  viewers: AerisLibraryViewer[];
}
export class AerisLibraryViewersManager extends ManagerDefault<AerisLibraryViewersManagerResults> {
  reload = (cdfiId?: number): void => {
    this.getAerisLibraryViewers(cdfiId);
  };

  getAerisLibraryViewers = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([libraryManager.getLibraryViewers(cdfiId)]).then(
          (values): AerisLibraryViewersManagerResults => ({
            viewers: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('libraryError', 'loadError'));
      },
    );
  };
}

interface AerisLibraryDocuemntAccess {
  id: number;
  fileName: string;
  hasAccess: boolean;
  canToggleAccess: boolean;
  categoryId: number;
  folderId: number;
}
export interface AerisLibraryDocumentsAccessManagerResults {
  permissions: AerisLibraryDocuemntAccess[];
}

export class AerisLibraryDocumentsAccessManager extends ManagerDefault<AerisLibraryDocumentsAccessManagerResults> {
  reload = (cdfiId?: number, companyId?: number): void => {
    this.getAerisDocumentsAccess(cdfiId, companyId);
  };

  getAerisDocumentsAccess = (cdfiId?: number, companyId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([
          libraryManager.getLibraryDocumentsAccess(cdfiId, companyId),
        ]).then((values): any => ({
          permissions: values[0],
        })),
      (e) => {
        notifyUser.error(uiText('libraryError', 'loadError'));
      },
    );
  };
}
