import {
  LibraryTableItemType,
  LibraryTableRowItem,
} from 'types/libraryTableItem';
import styles from '../LibraryTable.module.scss';

export const getRowClassName = (
  record: LibraryTableRowItem,
  dataSource?: LibraryTableRowItem[],
): string => {
  if (!dataSource) return '';

  const isLibraryTable = dataSource.some(
    (child) => child.type !== LibraryTableItemType.DOCUMENT,
  );

  return record.type === LibraryTableItemType.DOCUMENT && isLibraryTable
    ? styles.documentRow
    : '';
};
