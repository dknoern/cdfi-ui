import React, { ReactNode } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { LibraryTableRowItem } from 'types/libraryTableItem';
import { CdfiSubscription, TransformedItem } from 'types';
import { DocumentsWithinParentFolders } from 'types/library';
import styles from '../LibraryTable.module.scss';

export const getExpandableIcon = ({
  expanded,
  onExpand,
  record,
}: {
  expanded: boolean;
  onExpand: (
    record: LibraryTableRowItem,
    event: React.MouseEvent<HTMLElement>,
  ) => void;
  record: LibraryTableRowItem;
}): ReactNode => {
  if (
    !record.children ||
    (record.children && (record.children as any[]).length < 1)
  )
    return null;

  return expanded ? (
    <UpOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIcon}
    />
  ) : (
    <DownOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIcon}
    />
  );
};

export const getExpandableIconSubscriptions = ({
  expanded,
  onExpand,
  record,
}: {
  expanded: boolean;
  onExpand: (
    record: CdfiSubscription,
    event: React.MouseEvent<HTMLElement>,
  ) => void;
  record: CdfiSubscription;
}): ReactNode => {
  if (
    !record.reports ||
    (record.reports && (record.reports as any[]).length < 1)
  )
    return null;

  return expanded ? (
    <UpOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIcon}
    />
  ) : (
    <DownOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIcon}
    />
  );
};

export const getExpandableIconLibrary = ({
  expanded,
  onExpand,
  record,
}: {
  expanded: boolean;
  onExpand: (
    record: TransformedItem,
    event: React.MouseEvent<HTMLElement>,
  ) => void;
  record: TransformedItem;
}): ReactNode => {
  if (
    !record.children ||
    (record.children && (record.children as any[]).length < 1)
  )
    return null;

  return expanded ? (
    <UpOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIcon}
    />
  ) : (
    <DownOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIcon}
    />
  );
};

export const getExpandableIconDocumentsAccess = ({
  expanded,
  onExpand,
  record,
}: {
  expanded: boolean;
  onExpand: (
    record: DocumentsWithinParentFolders,
    event: React.MouseEvent<HTMLElement>,
  ) => void;
  record: DocumentsWithinParentFolders;
}): ReactNode => {
  if (
    !record.children ||
    (record.children && (record.children as any[]).length < 1)
  )
    return null;

  return expanded ? (
    <UpOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIconPermissions}
    />
  ) : (
    <DownOutlined
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandedIconPermissions}
    />
  );
};
