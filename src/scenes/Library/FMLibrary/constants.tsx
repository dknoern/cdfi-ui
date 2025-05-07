import { LibraryFolderType, MetricSharePeriod } from 'types';
import {
  FolderTableItem,
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
