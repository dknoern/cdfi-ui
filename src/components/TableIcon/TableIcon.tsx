import React, { FC } from 'react';
import { FolderFilled, FolderOutlined } from '@ant-design/icons';
import { TableIconType } from 'types';
import { LevelDeeperIcon } from 'components/CustomIcons';
import styles from './TableIcon.module.scss';

const classes = {
  folder: styles.folder,
  'sub-folder': styles.subFolder,
  branch: styles.branch,
  get default(): string {
    return this.branch;
  },
};

type TableIconProps = {
  type: TableIconType;
};
export const TableIcon: FC<TableIconProps> = ({ type }) => {
  const className = classes[type] || classes.default;

  switch (type) {
    case 'branch':
      return <LevelDeeperIcon className={className} />;
    case 'sub-folder':
      return <FolderOutlined className={className} />;
    default:
      return <FolderFilled className={className} />;
  }
};
