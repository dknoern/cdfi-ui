import React, { FC } from 'react';
import styles from './FormDefaultLabel.module.scss';

type FormDefaultLabelProps = {
  text: string;
};

export const FormDefaultLabel: FC<FormDefaultLabelProps> = ({ text }) => {
  return <span className={styles.label}>{text}</span>;
};
