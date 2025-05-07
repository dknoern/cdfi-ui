import { MetricSharePeriod } from 'types';
import { LibraryTableColumns } from 'types/libraryTableItem';

export const FORM_ID = 'createFolderForm';
export const initialFolders = [
  {
    description: 'Default folder',
    documents: [],
    frequency: MetricSharePeriod.ANNUALLY,
    id: Date.now(),
    isSystemFolder: true,
    lastModified: '',
    name: 'Data Template Form',
    subFolders: [],
  },
  {
    description: 'Default folder',
    documents: [],
    frequency: MetricSharePeriod.QUARTERLY,
    id: Date.now() + 1,
    isSystemFolder: true,
    lastModified: '',
    name: 'Requested Performance Data',
    subFolders: [],
  },
];

export const columnsNames = [
  LibraryTableColumns.NAME,
  LibraryTableColumns.FREQUENCY,
  LibraryTableColumns.DESCRIPTION,
];
