import React, { FC } from 'react';
import { WithClass } from 'types';
import styles from './InnerSidebar.module.scss';

type InnerSidebarProps = {
  isVisible: boolean;
} & WithClass;

export const InnerSidebar: FC<InnerSidebarProps> = ({
  isVisible,
  className = '',
  children,
}) => {
  return (
    <div
      className={`${styles.innerSidebar} ${
        isVisible ? styles.active : ''
      } ${className}`}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
};
