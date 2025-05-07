import {
  DocumentView,
  FolderView,
  LibraryView,
  GlobalLibrary,
  GlobalLibraryCompanies,
  MoveDocumentView,
} from 'types/libraryViews';
import { Company } from 'types';
import { apiProcessor, performRequest } from 'tools';
import { makeFetch } from 'tools/APITools';
import { uiStore } from 'store';
import { InitialsFormData } from 'scenes/Library/AerisLibrary/AffirmAsCurrentForm';
import { AddNoteFormData } from 'scenes/Library/AerisLibrary/AddNoteForm';
import { updateLibraryDocumentsAccess } from './operations/libraryOperations';

class LibraryManager {
  uploadFile = (data: FormData): Promise<void> => {
    const OPERATION = 'UPLOAD_FILE';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post('uploadDocuments', null, data).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  downloadFiles = (files: DocumentView['id'][]): Promise<void> => {
    const OPERATION = 'downloadLibraryFiles';

    uiStore.addLoading(OPERATION);

    return makeFetch({
      url: apiProcessor.makeEndpoint(OPERATION, files),
      contentType: 'text/plain; charset=x-user-defined',
      data: null,
    }).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getGlobalLibraries = (): Promise<GlobalLibrary[]> => {
    const OPERATION = 'globalLibraries';

    return apiProcessor.get(OPERATION).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getFMLibrary = (companyId: Company['id']): Promise<GlobalLibrary> => {
    const OPERATION = 'fmLibrary';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION, companyId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getPCLibrary = (
    companyId: Company['id'],
    libraryId?: LibraryView['id'],
  ): Promise<LibraryView> => {
    const OPERATION = 'pcLibrary';

    return apiProcessor.get(OPERATION, { companyId, libraryId }).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  createLibrary = (library: {
    name: string;
    pcCompanies: { id: Company['id'] }[];
    folders: FolderView[];
  }): Promise<void> => {
    const OPERATION = 'createLibrary';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post(OPERATION, null, library).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  updatePCDocument = (documentVM: DocumentView): Promise<void> => {
    const OPERATION = 'updatePCDocument';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .patch(OPERATION, documentVM.id, documentVM)
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  movePCFolder = (moveVM: MoveDocumentView): Promise<void> => {
    const OPERATION = 'movePCFolder';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post(OPERATION, null, moveVM).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getGlobalLibrary = (libraryId: GlobalLibrary['id']): Promise<LibraryView> => {
    const OPERATION = 'globalLibrary';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION, libraryId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  updateLibrary = (
    libraryId: GlobalLibrary['id'],
    library: Pick<GlobalLibrary, 'id' | 'name'>,
  ): Promise<void> => {
    const OPERATION = 'updateLibrary';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, libraryId, library).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getCompaniesWithoutLibrary = (): Promise<GlobalLibraryCompanies[]> => {
    const OPERATION = 'companiesWithoutLibrary';

    uiStore.addLoading(OPERATION);

    return apiProcessor.get(OPERATION).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  createPCFolder = (
    companyId: Company['id'],
    folder: Pick<FolderView, 'id' | 'name' | 'description'>,
  ): Promise<void> => {
    const OPERATION = 'pcFolderCreate';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post(OPERATION, companyId, folder).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  createGlobalFolder = (
    libraryId: GlobalLibrary['id'],
    folder: Pick<FolderView, 'frequency' | 'name' | 'description'>,
  ): Promise<void> => {
    const OPERATION = 'globalFolderCreate';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post(OPERATION, libraryId, folder).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  updatePCFolder = (
    companyId: Company['id'],
    folderId: FolderView['id'],
    folder: Pick<FolderView, 'frequency' | 'name' | 'description' | 'id'>,
  ): Promise<void> => {
    const OPERATION = 'updatePCFolder';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .patch(OPERATION, { companyId, folderId }, folder)
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  updateGlobalFolder = (
    libraryId: GlobalLibrary['id'],
    folderId: FolderView['id'],
    folder: Pick<FolderView, 'frequency' | 'name' | 'description' | 'id'>,
  ): Promise<void> => {
    const OPERATION = 'updateGlobalFolder';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .patch(OPERATION, { folderId, libraryId }, folder)
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  deleteGlobalLibrary = (libraryId: GlobalLibrary['id']): Promise<void> => {
    const OPERATION = 'deleteGlobalLibrary';

    uiStore.addLoading(OPERATION);

    return apiProcessor.delete(OPERATION, libraryId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  deleteLibraryItems = (selectedItemIdsGrouped: {
    folderIds: FolderView['id'][];
    documentIds: DocumentView['id'][];
  }): Promise<void> => {
    const OPERATION = 'deleteLibraryItems';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .delete(OPERATION, selectedItemIdsGrouped)
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  deleteLibraryItem = (documentId: DocumentView['id']): Promise<void> => {
    const OPERATION = 'documentItem';
    uiStore.addLoading(OPERATION);
    return apiProcessor.delete(OPERATION, documentId).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getLibraryViewers = (id: number | undefined) => {
    const OPERATION = 'aerisLibraryViewers';
    uiStore.addLoading(OPERATION);
    return apiProcessor.get(OPERATION, id).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  getLibraryDocumentsAccess = (
    cdfiId: number | undefined,
    companyId: number | undefined,
  ): Promise<void> => {
    const OPERATION = 'aerisLibraryDocumentsAccess';
    uiStore.addLoading(OPERATION);
    return apiProcessor.get(OPERATION, { cdfiId, companyId }).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  putLibraryDocumentsAccess = (
    cdfiId: number | undefined,
    companyId: number | undefined,
    data: any,
    selectAll: boolean,
  ): Promise<void> => {
    const OPERATION = 'aerisLibraryDocumentsAccess';
    uiStore.addLoading(OPERATION);
    return performRequest<void>(
      'aerisLibraryDocumentsAccess',
      (operationName) =>
        apiProcessor
          .put(operationName, { cdfiId, companyId, selectAll }, data)
          .then(() => {
            uiStore.endLoading(OPERATION);
          }),
    );
  };

  affirmAsCurrent = (
    cdfiId: number,
    reviewId: DocumentView['id'],
    data: InitialsFormData,
  ): Promise<void> => {
    const OPERATION = 'review';
    uiStore.addLoading(OPERATION);
    return apiProcessor
      .post(OPERATION, { cdfiId: cdfiId, reviewId: reviewId }, { ...data })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  addNote = (
    cdfiId: number,
    reviewId: number,
    data: AddNoteFormData,
  ): Promise<void> => {
    const OPERATION = 'notes';
    uiStore.addLoading(OPERATION);
    return apiProcessor
      .post(OPERATION, { cdfiId: cdfiId, reviewId: reviewId }, { ...data })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  deleteNote = (
    cdfiId: number,
    reviewId: number,
    noteId: number,
  ): Promise<void> => {
    const OPERATION = 'notesDelete';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .delete(OPERATION, { cdfiId: cdfiId, reviewId: reviewId, noteId: noteId })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  deleteGlobalLibraryFolders = (ids: GlobalLibrary['id'][]): Promise<void> => {
    const OPERATION = 'deleteGlobalLibraryFolders';

    uiStore.addLoading(OPERATION);

    return apiProcessor.delete(OPERATION, ids).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  downloadReportingTemplate = (): Promise<void> => {
    const OPERATION = 'reportingTemplateDownload';

    uiStore.addLoading(OPERATION);

    return makeFetch({
      url: apiProcessor.makeEndpoint(OPERATION),
      contentType: 'text/plain; charset=x-user-defined',
      data: null,
    }).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };
}

export const library = new LibraryManager();
