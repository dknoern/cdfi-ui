import { UploadFile } from 'antd/lib/upload/interface';
import { DocumentView } from 'types/libraryViews';
import { ReportingPeriod } from 'types/reportedData';
import { ModalTypes } from 'constants/ui';
import React, { ReactElement } from 'react';
import { InitialsRecord } from 'scenes/Library/tools';
import { SharingPeriod } from './sharingPeriod';
import { Company } from './company';

export interface FilteredDoc {
  children?: FilteredDoc[];
  dateCreated: string;
  displayName: string | ReactElement;
  dueType: string;
  key: number;
  id: number;
  topLevel: number;
  fiscalQuarter: number;
  fiscalYear: number;
  isInitialsRequired: boolean;
  isNoteRequired: boolean;
  reviewId: number;
  needToShowInitials: boolean;
  initialsRecord: InitialsRecord;
  text: string;
  dateStamp: string;
  isNote: boolean;
  name: string;
  allNotes: AllNotes[];
  approvedBy: string;
  parentId: string;
  documentTypeName: string | undefined;
  dataset: string | undefined;
  filterValue: number;
}

export interface Documents {
  displayName: string;
  documentTypes?: DocumentType[];
  id: number;
  internal: false;
  name: string;
  position: number;
  subFolders?: Folder[];
  visible: true;
  documents?: Document[];
}

export interface Document {
  key: number;
  icon: React.ReactFragment | undefined;
  displayName: string;
  description?: string;
  dueType: string;
  dateCreated: string;
  fiscalQuarter: number;
  fiscalYear: number;
  id: number;
  name: string;
  submittedDate: string;
  topLevel: number;
  isInitialsRequired: boolean | undefined;
  isNoteRequired: boolean | undefined;
  reviewId: number;
  needToShowInitials: boolean | undefined;
  initialsRecord: InitialsRecord | undefined;
  allNotes: AllNotes[];
  approvedBy: string;
  parentId: string;
  documentTypeName: string | undefined;
  dataset: string | undefined;
  text: string | undefined;
  dateStamp: string | undefined;
  isNote: boolean | undefined;
  filterValue: number;
}

export interface AerisLibraryBase {
  headerMessage: string;
  library: Folder[];
}
export type AerisLibraryType = AerisLibraryBase;

export interface AerisLibraryViewer {
  companyId: number;
  name: string;
  key?: number;
}

export interface TransformedItem {
  children: TransformedItem[];
  description?: string;
  dateCreated: string;
  displayName: any;
  dueType: string;
  fiscalQuarter: number;
  fiscalYear: number;
  icon: React.ReactFragment[];
  id: number;
  key: number;
  name: string;
  submittedDate: string;
  topLevel: number;
  isInitialsRequired: boolean;
  isNoteRequired: boolean;
  reviewId: number;
  needToShowInitials: boolean;
  initialsRecord: InitialsRecord;
  allNotes: AllNotes[];
  approvedBy: string;
  parentId: string;
  documentTypeName: string | undefined;
  dataset: string | undefined;
  text: string;
  dateStamp: string;
  isNote: boolean;
  filterValue: number;
}

export interface Folder {
  id: number;
  name: string;
  displayName: string;
  description?: string; // not supported currently
  frequency?: SharingPeriod; // not supported currently
  position: number;
  visible: boolean;
  internal: boolean;
  parentFolder?: Folder[];
  documentTypes?: DocumentType[];
  subFolders?: Folder[];
  documents?: Document[];
  allNotes?: AllNotes[];
}

export interface AllNotes {
  notes: Note[];
  review: Review[];
}

export interface Note {
  companyId: number;
  dateStamp: string;
  documentTypeId: number;
  id: number;
  reviewId: number;
  text: string;
}

export interface Review {
  dateOfAnalysis: string;
  financialStrength: string;
  id: number;
  impactPerformance: string;
  policyPlus: boolean;
  reviewType: string;
  skipNotification: boolean;
}

export interface Library {
  id: number;
  name: string;
  created: number;
  createdBy: string;
  analystContent: string;
  cdfiContent: string;
  investorContent: string;
  libraryContent: string;
  portfolioCompanies: Company[];
}

export type CreatedFolderRaw = Pick<
  Folder,
  'name' | 'frequency' | 'description'
>;

export type CreatedFolder = CreatedFolderRaw & {
  personalTemplate: boolean;
  subFolders?: CreatedFolder[];
};

export type CreatedSubFolder = Omit<CreatedFolder, 'subFolders'> & {
  parentFolderId: number;
};

export type FolderType = Folder | CreatedFolder | CreatedSubFolder;

export type FileUploadFinishHandler = (
  type: ModalTypes,
  errorDocumentId?: DocumentView['id'],
  message?: string,
) => void;

export enum LibraryFolderType {
  PERFORMANCE_DATA = 'PERFORMANCE_DATA',
  TEMPLATE = 'TEMPLATE',
  UPLOAD_ERROR_FILES = 'UPLOAD_ERROR_FILES',
  CUSTOM = 'CUSTOM',
}

// Type Guards
export const isFolder = (item: FolderType): item is Folder => {
  if ((item as Folder).id) {
    return true;
  }

  return false;
};

export const isCreatedFolder = (item: FolderType): item is CreatedFolder => {
  if (!isFolder(item) && !(item as CreatedSubFolder).parentFolderId) {
    return true;
  }

  return false;
};

export const isCreatedSubFolder = (
  item: FolderType,
): item is CreatedSubFolder => {
  return !isFolder(item) && !isCreatedFolder(item);
};

export type FileUploadFormData = {
  file: UploadFile[];
  fiscalYear: ReportingPeriod['year'];
  fiscalQuarter: ReportingPeriod['quarter'];
  documentTypeId?: number | string;
};

export type FileUploadFormDataDocumentType = {
  file: UploadFile[];
  fiscalYear: ReportingPeriod['year'];
  fiscalQuarter: ReportingPeriod['quarter'];
  documentTypeId: number | string;
};

export interface AerisLibraryDocuemntAccess {
  id: number;
  fileName: string;
  hasAccess: boolean;
  canToggleAccess: boolean;
  categoryId: number;
  folderId: number;
}
export interface AerisLibraryDocuemntAccessWithKey {
  id: number;
  fileName: string;
  hasAccess: boolean;
  canToggleAccess: boolean;
  categoryId: number;
  folderId: number;
  key: number;
}

export type Viewers = {
  label: string;
  value: number;
  key: number;
  id: number;
};

export type DocumentPermissionsWithViewersType = {
  cdfiId?: number | undefined;
  selectAll: boolean;
  documentsList: FileUploadFormData[];
  viewers: Viewers;
};

export type DocumentsWithinParentFolders = {
  children: AerisLibraryDocuemntAccess[];
  fileName: string;
  id: number;
};

export type DocumentsWithinParentFoldersWithKey = {
  children: AerisLibraryDocuemntAccess[];
  fileName: string;
  id: number;
  key: number;
};
