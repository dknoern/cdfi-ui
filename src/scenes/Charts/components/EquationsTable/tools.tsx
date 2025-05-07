import React, { ReactNode } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styles from './EquationsTable.module.scss';

export const renderExpandIcon = ({
  expanded,
  expandable,
  record,
  onExpand,
}: any): ReactNode => {
  if (!expandable) return undefined;

  const Icon = expanded ? UpOutlined : DownOutlined;

  return (
    <Icon
      onClick={(e): void => onExpand(record, e)}
      className={styles.expandIcon}
    />
  );
};
