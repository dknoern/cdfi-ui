import React from 'react';
import { ColumnFilterItem } from 'antd/lib/table/interface';
import { DocumentView, FolderView, GlobalLibrary } from './libraryViews';

export enum LibraryTableItemType {
  ROOT = 'ROOT',
  FOLDER = 'FOLDER',
  DOCUMENT = 'DOCUMENT',
  LIBRARY = 'LIBRARY',
}

interface LibraryTableBaseItem {
  name: string;
  type: LibraryTableItemType;
  rowKey: React.Key;
}

export type LibraryTableRow<Item> = Item & LibraryTableBaseItem;

export type LibraryStoreTableItem = LibraryTableRow<{
  id: number;
}>;

export type FolderTableItem = Pick<
  FolderView,
  | 'id'
  | 'frequency'
  | 'description'
  | 'isSystemFolder'
  | 'folderType'
  | 'lastModified'
> & {
  children: LibraryTableRow<FolderTableItem & DocumentTableItem>[];
};

export const isFolderTableItem = (item: unknown): item is FolderTableItem => {
  return (item as FolderTableItem).folderType !== undefined;
};

export interface DocumentTableItem {
  id: DocumentView['id'];
  lastModified: number;
  reportingPeriod?: string;
}

export interface LibraryTableItem {
  id: GlobalLibrary['id'];
  pcCompanies: GlobalLibrary['pcCompanies'];
  children: LibraryTableRow<FolderTableItem>[];
}

export type LibraryTableRowItem = LibraryTableRow<
  (FolderTableItem & DocumentTableItem) | LibraryTableItem
>;

export type LibraryTableRowFileItem = LibraryTableRow<
  FolderTableItem & DocumentTableItem
>;

export type LibraryTableRowLibItem = LibraryTableRow<LibraryTableItem>;

export enum LibraryTableColumns {
  NAME = 'name',
  LAST_MODIFIED = 'lastModified',
  FREQUENCY = 'frequency',
  DESCRIPTION = 'description',
  COMPANIES = 'companies',
  ACTION = 'action',
  REPORTING_PERIOD = 'reportingPeriod',
}

export type ColumnWidth = {
  [key in LibraryTableColumns]?: string;
};

export type TableItem = {
  id: React.Key;
  type: LibraryTableItemType;
};

export type LibraryTableFilters = {
  companies?: ColumnFilterItem[];
};
