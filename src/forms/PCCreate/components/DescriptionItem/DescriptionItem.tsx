import React, { FC } from 'react';
import styles from './DescriptionItem.module.scss';

type DescriptionItemProps = {
  label: string;
  id?: string;
};

export const DescriptionItem: FC<DescriptionItemProps> = ({
  label,
  id,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.children} id={`${id}_container`}>
        {children}
      </div>
    </div>
  );
};
