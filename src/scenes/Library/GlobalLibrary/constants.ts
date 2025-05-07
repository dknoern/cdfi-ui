import { LibraryFolderType, MetricSharePeriod } from 'types';
import {
  FolderTableItem,
  LibraryTableColumns,
  LibraryTableItemType,
  LibraryTableRow,
} from 'types/libraryTableItem';
import { FolderView } from 'types/libraryViews';

export const initialFolder: FolderView = {
  id: 0,
  name: '',
  frequency: MetricSharePeriod.QUARTERLY,
  lastModified: 0,
  description: '',
  documents: [],
  subFolders: [],
  isSystemFolder: false,
  folderType: LibraryFolderType.CUSTOM,
};

export const initialFolderTableItem: LibraryTableRow<FolderTableItem> = {
  id: 0,
  name: '',
  frequency: MetricSharePeriod.QUARTERLY,
  lastModified: 0,
  description: '',
  type: LibraryTableItemType.ROOT,
  children: [],
  rowKey: '',
  isSystemFolder: false,
  folderType: LibraryFolderType.CUSTOM,
};

export const rootLibraryColumns = [
  LibraryTableColumns.NAME,
  LibraryTableColumns.COMPANIES,
];

export const initialFolders = [
  {
    description: 'Default folder',
    documents: [],
    frequency: MetricSharePeriod.ANNUALLY,
    id: Date.now(),
    isSystemFolder: true,
    folderType: LibraryFolderType.TEMPLATE,
    lastModified: 0,
    name: 'Data Template Form',
    subFolders: [],
  },
  {
    description: 'Default folder',
    documents: [],
    frequency: MetricSharePeriod.QUARTERLY,
    id: Date.now() + 1,
    isSystemFolder: true,
    folderType: LibraryFolderType.PERFORMANCE_DATA,
    lastModified: 0,
    name: 'Requested Performance Data',
    subFolders: [],
  },
];

export const initialValues4Library = {
  name: '',
  pcCompanies: [],
  folders: initialFolders,
};

export const globalLibraryFoldersColumns = [
  LibraryTableColumns.NAME,
  LibraryTableColumns.FREQUENCY,
  LibraryTableColumns.LAST_MODIFIED,
];

export const thumbsTooltip = {
  approved: 'Document is approved. Click to remove.',
  approvedColor: 'rgba(100, 179, 22, .7)',
  disapproved: 'Document is not yet approved. Click to approve',
  disapprovedColor: 'rgba(250, 173, 20, .7)'
}