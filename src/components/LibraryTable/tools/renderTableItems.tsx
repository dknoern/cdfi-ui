import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderFilled,
  FolderOutlined,
  FileExcelFilled,
  UploadOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import {
  LibraryTableRowItem,
  LibraryTableItemType,
  LibraryTableRowFileItem,
  LibraryTableRowLibItem,
} from 'types/libraryTableItem';
import { FolderView } from 'types/libraryViews';
import { LevelDeeperIcon } from 'components/CustomIcons';
import { TagsList } from 'components/TagsList';
import { isUploadDisabled } from './isUploadDisabled';
import styles from '../LibraryTable.module.scss';

export const renderItemName = (
  value: string,
  record: LibraryTableRowItem,
  getTableItemLink?: (folderId: FolderView['id']) => string,
): ReactNode => {
  const link = getTableItemLink ? getTableItemLink(record.id) : null;

  let content;
  switch (record.type) {
    case LibraryTableItemType.LIBRARY:
      return (
        <Link to={`/libraries/${record.id}`} className={styles.link}>
          {value}
        </Link>
      );
    case LibraryTableItemType.ROOT:
      content = (
        <>
          <FolderFilled
            className={`${styles.folderIcon} ${styles.folderIconRoot}`}
          />{' '}
          {value}
        </>
      );

      return link ? (
        <Link to={link} className={styles.nameLink}>
          {content}
        </Link>
      ) : (
        content
      );
    case LibraryTableItemType.FOLDER:
      content = (
        <>
          <LevelDeeperIcon className={styles.branchIcon} />
          <FolderOutlined className={styles.folderIcon} /> {value}
        </>
      );
      return link ? (
        <Link to={link} className={styles.nameLink}>
          {content}
        </Link>
      ) : (
        content
      );
    case LibraryTableItemType.DOCUMENT:
    default:
      return renderDocumentName(value);
  }
};

export const renderDocumentName = (value: string): ReactNode => (
  <>
    <FileExcelFilled className={styles.fileIcon} />
    {value}
  </>
);

export const renderAction = (
  value: string,
  record: LibraryTableRowFileItem,
  onActionClick?: (folderId: FolderView['id']) => void,
): ReactNode =>
  (record.type === LibraryTableItemType.FOLDER ||
    record.type === LibraryTableItemType.ROOT) &&
  onActionClick ? (
    <Button
      onClick={(): void => onActionClick(record.id)}
      disabled={isUploadDisabled(record.id)}
      type="primary"
      icon={<UploadOutlined className={styles.actionButtonIcon} />}
    >
      Upload File
    </Button>
  ) : null;

export const renderCompanies = (
  value: string,
  record: LibraryTableRowLibItem,
): ReactNode => <TagsList items={record.pcCompanies} />;
