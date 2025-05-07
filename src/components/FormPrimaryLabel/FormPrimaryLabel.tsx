import React, { FC } from 'react';
import styles from './FormPrimaryLabel.module.scss';

type Props = {
  text: React.ReactText;
  num?: React.ReactText;
  hint?: React.ReactText;
};

export const FormPrimaryLabel: FC<Props> = ({ text, num, hint }) => {
  return (
    <span
      className={`${styles.primaryLabel}${num ? ` ${styles.withNumber}` : ''}`}
    >
      {num && <span className={styles.number}>{num}. </span>}
      <span className={styles.title}>{text}</span>{' '}
      {hint && <small className={styles.hint}>{hint}</small>}
    </span>
  );
};
