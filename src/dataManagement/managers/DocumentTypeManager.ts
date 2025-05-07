import { ManagerDefault } from './ManagerDefault';
import {
  DocumentType,
} from 'types';
import {
  getDocumentTypes,
} from '../operations/documentTypeOperations';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';

export interface DocumentTypesResults {
  documentTypes: DocumentType[];
}

export class DocumentTypeManager extends ManagerDefault<DocumentTypesResults> {

  reload = (cdfiId?: number): void => {
    this.getDocumentTypes(cdfiId);
  };

  getDocumentTypes = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getDocumentTypes(cdfiId)]).then(
          (values): DocumentTypesResults => ({
            documentTypes: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('documentTypes', 'loadError'));
      },
    );
  };
}