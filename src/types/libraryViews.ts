import { Company, MetricSharePeriod } from 'types';
import { LibraryFolderType } from './library';

export interface DocumentView {
  id: number;
  name: string;
  lastModified: number;
  fiscalYear?: number;
  fiscalQuarter?: string;
}

export interface FolderView {
  id: number;
  name: string;
  frequency: MetricSharePeriod;
  description: string;
  lastModified: number;
  documents: DocumentView[];
  subFolders: FolderView[];
  isSystemFolder: boolean;
  folderType: LibraryFolderType;
}

export interface LibraryView {
  id: number;
  name: string;
  folders: FolderView[];
}

export type GlobalLibraryCompanies = Pick<Company, 'id' | 'name'>;

export type GlobalLibrary = LibraryView & {
  pcCompanies: GlobalLibraryCompanies[];
};

export type MoveDocumentView = {
  documentIds: DocumentView['id'][];
  folderId: FolderView['id'];
};

export interface LibraryFolderViewState {
  folderType?: LibraryFolderType;
}

export type FolderIdConfig = Record<LibraryFolderType, FolderView['id']>;
