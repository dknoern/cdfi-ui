import React, { FC } from 'react';
import styles from './ServicePageLayout.module.scss';

export const ServicePageLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
