import React, { FC } from 'react';
import styles from './SubLabel.module.scss';

export const SubLabel: FC<{ text: string }> = ({ text }) => {
  return <span className={styles.subLabel}>{text}</span>;
};
