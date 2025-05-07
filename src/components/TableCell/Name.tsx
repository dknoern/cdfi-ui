import React, { FC } from 'react';
import styles from './TableCell.module.scss';

export const Name: FC = ({ children }) => {
  return <div className={styles.nameCellInner}>{children}</div>;
};
