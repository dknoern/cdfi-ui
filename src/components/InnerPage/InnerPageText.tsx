import React, { FC } from 'react';
import { WithClass } from 'types';
import styles from './InnerPage.module.scss';

export const InnerPageText: FC<WithClass> = ({ children, className = '' }) => {
  return <div className={`${styles.text} ${className}`}>{children}</div>;
};
